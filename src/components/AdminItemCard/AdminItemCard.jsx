import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AdminItemCard.scss';
import { adminItemEdit } from '../../actions';

class AdminItemCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: 0,
      name: '',
      description: '',
      dims: '',
      sellerID: 0,
      seller: '',
      condition: '',
      category: '',
      subCategory: '',
      inventory: '',
      price: '',
      shipping: '',
      approved: '',
      status: '',
      views: '',
      image: '',
    };

    this.handleApprovalChange = this.handleApprovalChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      id: this.props.id,
      name: this.props.name,
      description: this.props.description,
      dims: this.props.dims,
      sellerID: this.props.sellerID,
      seller: this.props.seller,
      condition: this.props.condition,
      category: this.props.category,
      subCategory: this.props.subCategory,
      inventory: this.props.inventory,
      price: this.props.price,
      shipping: this.props.shipping,
      views: this.props.views,
      image: this.props.image,
    });

    if (this.props.active) {
      this.setState({
        status: 'ACTIVE',
      });
    } else {
      this.setState({
        status: 'INACTIVE',
      });
    }

    if (this.props.approved) {
      this.setState({
        approved: 'YES',
      });
    } else {
      this.setState({
        approved: 'NO',
      });
    }
  }

  handleApprovalChange(e) {
    e.preventDefault();
    if (this.state.approved === 'YES') {
      const data = {
        id: this.state.id,
        approved: false
      }

      this.props.adminItemEdit(data);
      return this.setState({ approved: 'NO' })
      
    } else {
      const data = {
        id: this.state.id,
        approved: true
      }

      this.props.adminItemEdit(data);
      this.setState({ approved: 'YES'})
    }
  }

  render() {
    return (
      <div className="item-card">
        <div className="break-div">
          <div className="item-subdiv">
            <div className="image-div">
              <img src={this.state.image} />
            </div>
          </div>
          <div className="item-subdiv">
            <h3>
              Item# {this.state.id}:&nbsp;&nbsp;{this.state.name}
            </h3>
            <p>
              {this.state.dims} - {this.state.description}
            </p>
            <p>Seller:&nbsp;&nbsp;{this.state.seller}</p>
            <p>Views:&nbsp;&nbsp;{this.state.views}</p>
            <p>Category:&nbsp;&nbsp;{this.state.category}</p>
            <p>Sub-Category:&nbsp;&nbsp;{this.state.subCategory}</p>
          </div>
        </div>

        <div className="break-div">
          <div className="item-subdiv">
            <p>Condition:&nbsp;&nbsp;{this.state.condition}</p>
            <p>Status:&nbsp;&nbsp;{this.state.status}</p>
            <p>Inventory:&nbsp;&nbsp;{this.state.inventory}</p>
            <p>Price:&nbsp;&nbsp;{this.state.price}</p>
            <p>Shipping Price:&nbsp;&nbsp;{this.state.shipping}</p>
          </div>
          <div className="toggle">
            <button onClick={this.handleApprovalChange}>Approve/Unapprove</button>
            <br /><br />
            <p><span className="approval">Approved:&nbsp;&nbsp;{this.state.approved}</span></p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    item: state.itemReducer.item
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    adminItemEdit: (data) => dispatch(adminItemEdit(data))
  };
};

AdminItemCard = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdminItemCard);

export default AdminItemCard;
