// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract EscrowFactory {
    mapping(uint256 => address) public escrows;
    uint256 public nextEscrowId;

    event EscrowCreated(uint256 escrowId, address escrowAddress, address seller, uint256 amount);
    
    // Create escrow contract
    function createEscrow() external payable returns (uint256) {
        require(msg.value > 0, "Must deposit funds to create escrow");

        // Create a new escrow contract
        Escrow newEscrow = new Escrow{value: msg.value}(msg.sender, msg.value);
        
        uint256 escrowId = nextEscrowId;
        escrows[escrowId] = address(newEscrow);
        nextEscrowId++;
        
        emit EscrowCreated(escrowId, address(newEscrow), msg.sender, msg.value);
        return escrowId;
    }
}

contract Escrow is ReentrancyGuard {
    // Variables
    address public buyer;
    address public seller;
    uint256 public amount;
    bool public isComplete;
    address payable public feeCollector;
    uint256 public feePercentage = 1; // 1% fee, can be updated

    enum State { NO_BUYER, AWAITING_PAYMENT, PAID, PAYMENT_CONFIRMED, COMPLETED, REFUNDED }
    State public currentState;

    // Events
    event FundsDeposited(uint256 amount);
    event BuyerAdded(address buyer);
    event MarkedPaid();
    event PaymentConfirmed();
    event FundsReleased();
    event FundsRefunded();
    event FeeCollected(address feeCollector, uint256 feeAmount);
    event BuyerConfirmed(address buyer);

    // Modifiers
    modifier onlyBuyer() {
        require(msg.sender == buyer, "Only buyer can call this function");
        _;
    }

    modifier onlySeller() {
        require(msg.sender == seller, "Only seller can call this function");
        _;
    }

    modifier inState(State _state) {
        require(currentState == _state, "Invalid state for this action");
        _;
    }

    // Constructor
    constructor(address _seller, uint256 _amount) payable {
        require(msg.value > 0, "Must deposit funds to create escrow");
        
        seller = _seller;
        amount = _amount;
        currentState = State.NO_BUYER;
        feeCollector = payable(msg.sender);  // Fee collector set to the creator of escrow
        
        emit FundsDeposited(msg.value);
    }

    // Add buyer to the escrow contract
    function addBuyer(address _buyer) external inState(State.NO_BUYER) nonReentrant {
        buyer = _buyer;
        currentState = State.AWAITING_PAYMENT;

        emit BuyerAdded(_buyer);
    }

    // Mark payment as received (seller)
    function markPaid() external inState(State.AWAITING_PAYMENT) nonReentrant {
        currentState = State.PAID;
        emit MarkedPaid();
    }

    // Confirm payment (seller)
    function confirmPayment() external onlySeller inState(State.PAID) nonReentrant {
        currentState = State.PAYMENT_CONFIRMED;
        releaseFunds();
        emit PaymentConfirmed();
    }

    // Release funds to buyer
    function releaseFunds() private nonReentrant {
        uint256 feeAmount = (amount * feePercentage) / 100;
        uint256 amountAfterFee = amount - feeAmount;
        
        // Collect fee
        (bool feeSuccess, ) = feeCollector.call{value: feeAmount}("");
        require(feeSuccess, "Fee transfer failed");
        emit FeeCollected(feeCollector, feeAmount);

        // Release funds to buyer
        (bool buyerSuccess, ) = payable(buyer).call{value: amountAfterFee}("");
        require(buyerSuccess, "Funds transfer failed");
        
        currentState = State.COMPLETED;
        isComplete = true;
        emit FundsReleased();
    }

    // Buyer confirms receiving the goods/services
    function confirmReceipt() external onlyBuyer inState(State.PAYMENT_CONFIRMED) nonReentrant {
        currentState = State.COMPLETED;
        emit BuyerConfirmed(buyer);
    }

    // Refund funds to buyer in case of dispute (only after being marked as PAID)
    function refund() external onlySeller inState(State.PAID) nonReentrant {
        (bool success, ) = payable(buyer).call{value: amount}("");
        require(success, "Refund failed");
        currentState = State.REFUNDED;
        emit FundsRefunded();
    }

    // Change fee percentage (only feeCollector)
    function changeFeePercentage(uint256 _newFee) external nonReentrant {
        require(msg.sender == feeCollector, "Only fee collector can change fee");
        require(_newFee <= 5, "Fee percentage too high");  // Cap fee percentage to 5%
        feePercentage = _newFee;
    }
}
