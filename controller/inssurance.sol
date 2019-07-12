pragma solidity ^0.5.0 ;

contract InsuranceClaim {
    struct Insurance {
        uint256 issuranceId;
        string customer;
        string issuer;
        string product;
        uint256 cost;
        uint256 issue_date;
        uint256 end_date;
        uint256 premium_amount;
        uint256 cover_cost;
    }
    
    struct Claim {
        address customer;
        uint256 id;
        uint256 firNo;
    }
    uint256 id;
    struct verification {
        uint256 iid;
        uint256 fir;
    }
    
    
    uint256 _firNumber;
    mapping(address => uint256) customerInssuranceId;
    mapping(uint256 => Insurance) issurances;
    mapping(uint256 => uint256) firNumber;
    mapping(uint256 => Claim) claim_requests;
    mapping(uint256 => verification) verification_requests;    
    // mapping()
    
    event InsurranceIssued(address indexed customer, uint indexed id);
    event CLaimRequested(address indexed customer, uint indexed id, uint indexed fir);
    event VerificationRequested(uint indexed id, uint indexed fir, string customer, string product, uint256 end_date);
    event Verified(uint indexed id, uint indexed fir);
    event FIRFiled(uint indexed id, uint indexed fir);

    function buyInssurance(
        string memory _customer, 
        string memory _issuer,
        string memory _product, 
        uint256 _cost,
        uint256 _issue_date,
        uint256 _end_date,
        uint256 _premium_amount,
        uint256 _cover_cost)
    public 
    returns(uint256) {
        id++;
        customerInssuranceId[msg.sender] = id;
        issurances[id].issuranceId = id;
        issurances[id].customer = _customer;
        issurances[id].issuer = _issuer;
        issurances[id].product = _product;
        issurances[id].cost = _cost;
        issurances[id].issue_date = _issue_date;
        issurances[id].end_date = _end_date;
        issurances[id].premium_amount = _premium_amount;
        issurances[id].cover_cost = _cover_cost;
        
        emit InsurranceIssued(msg.sender, issurances[id].issuranceId);
        
        return issurances[id].issuranceId;
            
    }
    
    function fileFIR(uint256 _id) public returns(bool) {
        require(issurances[_id].issuranceId == _id, "Insurrance does not exist");
        firNumber[_id] = _firNumber;
        emit FIRFiled(_id, _firNumber);
        _firNumber++;
        return true;
    }
    
    function getInssurance(uint256 _id) public view returns(
        string memory , 
        string memory ,
        string memory , 
        uint256 ,
        uint256 ,
        uint256 ,
        uint256 
        )
    {
        return(
        issurances[_id].customer,
        issurances[_id].issuer,
        issurances[_id].product,
        issurances[_id].cost,
        issurances[_id].issue_date,
        issurances[_id].end_date,
        issurances[_id].cover_cost);
    }
    
    function getClaimRequest(uint256 _id) public view returns(address, uint256, uint256) {
        require(claim_requests[_id].id != 0);
        return (claim_requests[_id].customer,
        claim_requests[_id].id,
        claim_requests[_id].firNo);
    }
    
    function claimRequest(uint256 _id, uint256 _firNo) public returns(uint256) {
        require(claim_requests[_id].id == 0);
        claim_requests[_id].customer = msg.sender;
        claim_requests[_id].id = _id;
        claim_requests[_id].firNo = _firNo;
        emit CLaimRequested(msg.sender, _id, _firNo);
        return _id;
    }
    
    function getVerificationRequest(uint256 _id) public view returns(uint256, uint256) {
        require( verification_requests[_id].iid == _id);
        return (
        verification_requests[_id].iid,
        verification_requests[_id].fir);
    }
    function verificationRequest(uint256 _id, uint256 _firNo) public {
        require(issurances[_id].issue_date <= now);
        require(issurances[_id].end_date >= now);
        require(issurances[_id].issuranceId == _id);
        verification_requests[_id].iid = _id;
        verification_requests[_id].fir = _firNo;
        emit VerificationRequested(_id, _firNo, issurances[_id].customer, issurances[_id].product, issurances[_id].end_date );
    }
    
    function policeVerification(uint _fir, uint _inssuranceId) public returns(bool){
        require(firNumber[_inssuranceId] == _fir, "FIR is not filed");
        emit Verified(_fir, _inssuranceId);
        return (true);
    }
        
} 