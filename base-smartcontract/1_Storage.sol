// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EscrowFactory {
    mapping(uint256 => address) public escrows;
    uint256 public nextEscrowId;

    event EscrowCreated(uint256 escrowId, address escrowAddress, address seller, uint256 amount);
    event EscrowCreated1(uint256 amount);

    function createEscrow() external payable returns (uint256) {
        Escrow newEscrow = new Escrow{value: msg.value}(msg.sender, msg.value);
        
        uint256 escrowId = nextEscrowId;
        escrows[escrowId] = address(newEscrow);
        nextEscrowId++;
        
        emit EscrowCreated(escrowId, address(newEscrow), msg.sender, msg.value);
        return escrowId;
    }
}

contract Escrow {
    // Variables
    address public buyer;
    address public seller;
    uint256 public amount;
    bool public isComplete;
    address payable public feeCollector;
    
    enum State { NO_BUYER, AWAITING_PAYMENT, PAID, PAYMENT_CONFIRMED, COMPLETED, REFUNDED }
    State public currentState;

    // Events
    event FundsDeposited(uint256 amount);
    event BuyerAdded(address buyer);
    event MarkedPaid();
    event PaymentConfirmed();
    event FundsReleased();
    event FundsRefunded();

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

    event Test (uint256 i);
    constructor(address _seller, uint256 _amount) payable {
        require(msg.value > 0, "Must deposit funds to create escrow");
        
        seller = _seller;
        amount = _amount;
        currentState = State.NO_BUYER;
        
        emit FundsDeposited(msg.value);
    }

    function addBuyer(address _buyer) external inState(State.NO_BUYER) {
        buyer = _buyer;
        currentState = State.AWAITING_PAYMENT;

        emit BuyerAdded(_buyer);
    }

    function markPaid () external inState(State.AWAITING_PAYMENT) {
        currentState = State.PAID;
        emit MarkedPaid();
    }

    function confirmPayment () external  onlySeller inState(State.PAID) {
        currentState = State.PAYMENT_CONFIRMED;
        releaseFunds();
        emit PaymentConfirmed();
    }

    function releaseFunds() private {
        currentState = State.COMPLETED;
        payable(buyer).transfer(amount);
        isComplete = true;
        emit FundsReleased();
    }
}