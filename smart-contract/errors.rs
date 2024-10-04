use anchor_lang::prelude::error_code;

#[error_code]
pub enum EscrowError {
    #[msg("Escrow unpaid")]
    SaleNotPaid,
    #[msg("Escrow already paid")]
    SaleAlreadyPaid,
    #[msg("Escrow already finished")]
    SaleAlreadyFinished,
    #[msg("Buyer is not set!")]
    BuyerNotSet,
    #[msg("Buyer assigned already")]
    BuyerAssignedAlready,
    #[msg("Sale Canceled")]
    SaleCaneled,
    #[msg("Unauthorized")]
    Unauthorized,
}
