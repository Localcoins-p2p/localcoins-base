use anchor_lang::{
    prelude::*,
    solana_program::{clock::Clock, hash::hash, program::invoke, system_instruction::transfer},
};

mod constants;
use crate::constants::*;

mod error;
use crate::error::*;

declare_id!("8iHqRkHu81xNRJDfUCSPgG6fMNGPUqMAsxJtJkJgAbkT");

#[program]
pub mod escrow {
    use super::*;
    pub fn init_master(_ctx: Context<InitMaster>) -> Result<()> {
        Ok(())
    }

    pub fn create_sale(ctx: Context<CreateSale>, amount: u64) -> Result<()> {
        let sale = &mut ctx.accounts.sale;
        let master = &mut ctx.accounts.master;

        master.last_id += 1;
        sale.id = master.last_id;
        sale.authority = ctx.accounts.authority.key();
        sale.amount = amount;
        sale.seller = ctx.accounts.authority.key();

        invoke(
            &transfer(&sale.seller.key(), &sale.key(), amount),
            &[
                ctx.accounts.authority.to_account_info(),
                sale.to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
        )?;

        return Ok(());
    }

    pub fn add_buyer(ctx: Context<AddRemoveBuyer>, sale_id: u32) -> Result<()> {
        let sale = &mut ctx.accounts.sale;
        let master = &mut ctx.accounts.master;

        require!(
            sale.buyer == Pubkey::default(),
            EscrowError::BuyerAssignedAlready
        );
        require!(!sale.isCanceled, EscrowError::SaleCaneled);

        //let clock = Clock::get()?;

        sale.buyer = ctx.accounts.authority.key();
        //sale.buyer_added_at = Some(clock.unix_timestamp);
        Ok(())
    }

    pub fn remove_buyer(ctx: Context<AddRemoveBuyer>, sale_id: u32) -> Result<()> {
        let sale = &mut ctx.accounts.sale;
        let authority = &mut ctx.accounts.authority;

        // only remove buyer if current account is buyer and
        // sale is not paid

        require!(!sale.isPaid, EscrowError::SaleAlreadyPaid);
        require_eq!(sale.buyer, authority.key(), EscrowError::Unauthorized);

        sale.buyer = Pubkey::default();
        sale.buyer_added_at = None;
        Ok(())
    }

    pub fn force_remove_buyer(ctx: Context<AddRemoveBuyer>, sale_id: u32) -> Result<()> {
        let sale = &mut ctx.accounts.sale;
        let authority = &mut ctx.accounts.authority;

        require!(!sale.isPaid, EscrowError::SaleAlreadyPaid);
        require_eq!(sale.seller, authority.key(), EscrowError::Unauthorized);
        // todo: require - check that 30 minutes have passed

        sale.buyer = Pubkey::default();
        Ok(())
    }

    pub fn mark_paid(ctx: Context<MarkPaid>, sale_id: u32) -> Result<()> {
        let sale = &mut ctx.accounts.sale;
        let seller = &mut ctx.accounts.authority;

        require_eq!(sale.seller, seller.key(), EscrowError::Unauthorized);

        sale.isPaid = true;

        Ok(())
    }

    pub fn claim_payment(ctx: Context<ClaimPayment>, sale_id: u32) -> Result<()> {
        let sale = &mut ctx.accounts.sale;
        let buyer = &mut ctx.accounts.authority;

        if sale.buyer == Pubkey::default() {
            return Err(EscrowError::BuyerNotSet.into());
        }

        require!(sale.isPaid, EscrowError::SaleNotPaid);
        require!(!sale.isFinished, EscrowError::SaleAlreadyFinished);
        require_eq!(sale.buyer, buyer.key(), EscrowError::Unauthorized);

        **sale.to_account_info().try_borrow_mut_lamports()? -= sale.amount;
        **buyer.to_account_info().try_borrow_mut_lamports()? += sale.amount;

        sale.isFinished = true;

        Ok(())
    }

    pub fn cancel_sale(ctx: Context<ClaimPayment>, sale_id: u32) -> Result<()> {
        let sale = &mut ctx.accounts.sale;
        let seller = &mut ctx.accounts.authority;

        require!(
            sale.buyer == Pubkey::default(),
            EscrowError::BuyerAssignedAlready
        );

        **sale.to_account_info().try_borrow_mut_lamports()? -= sale.amount;
        **seller.to_account_info().try_borrow_mut_lamports()? += sale.amount;

        sale.isCanceled = true;
        Ok(())
    }

}

#[derive(Accounts)]
pub struct InitMaster<'info> {
    #[account(
        init,
        payer = payer,
        space = 4 + 8,
        seeds = [MASTER_SEED.as_bytes()],
        bump
    )]
    pub master: Account<'info, Master>,

    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct Master {
    pub last_id: u32,
}

#[derive(Accounts)]
#[instruction(sale_id:u32)]
pub struct AddRemoveBuyer<'info> {
    #[account(
        mut,
        seeds = [SALE_SEED.as_bytes(), &sale_id.to_le_bytes()],
        bump,
    )]
    pub sale: Account<'info, Sale>,

    #[account(
        mut,
        seeds = [MASTER_SEED.as_bytes()],
        bump,
    )]
    pub master: Account<'info, Master>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(sale_id:u32)]
pub struct MarkPaid<'info> {
    #[account(
        mut,
        seeds = [SALE_SEED.as_bytes(), &sale_id.to_le_bytes()],
        bump,
    )]
    pub sale: Account<'info, Sale>,

    #[account(
        mut,
        seeds = [MASTER_SEED.as_bytes()],
        bump,
    )]
    pub master: Account<'info, Master>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(sale_id:u32)]
pub struct ClaimPayment<'info> {
    #[account(
        mut,
        seeds = [SALE_SEED.as_bytes(), &sale_id.to_le_bytes()],
        bump,
    )]
    pub sale: Account<'info, Sale>,

    #[account(
        mut,
        seeds = [MASTER_SEED.as_bytes()],
        bump,
    )]
    pub master: Account<'info, Master>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct CreateSale<'info> {
    #[account(
        init,
        payer = authority,
        space = 4 + 32 + 8 + 32 + 32 + 1 + 1 + 1 + 8 + 8,
        seeds = [SALE_SEED.as_bytes(), &(master.last_id + 1).to_le_bytes()],
        bump,
    )]
    pub sale: Account<'info, Sale>,

    #[account(
        mut,
        seeds = [MASTER_SEED.as_bytes()],
        bump,
    )]
    pub master: Account<'info, Master>,

    #[account(mut)]
    pub authority: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[account]
pub struct Sale {
    pub id: u32,
    pub authority: Pubkey,
    pub amount: u64,
    pub seller: Pubkey,
    pub buyer: Pubkey,
    pub buyer_added_at: Option<i64>,
    pub isCanceled: bool,
    pub isPaid: bool,
    pub isFinished: bool,
}
