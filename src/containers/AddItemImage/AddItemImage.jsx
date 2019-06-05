import React, { Component } from 'react';
import { connect } from 'react-redux';
import './AddItemImage.scss';
import { addItem } from '../../actions';
import { resetNewItem } from '../../actions';
import { addImage } from '../../actions';

class AddItemImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
    };
    this.handleInputOnChange = this.handleInputOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputOnChange(e) {
    const name = e.target.name;
    let file;
    if (e.target.files) {
      file = e.target.files[0];
    }
    if (name === 'image') {
      return this.setState({ image: file });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    // if (this.state.image !== '') {
    let formData = new FormData(e.target);
    console.log(formData);
    // formData.append('test', 'heeooo');
    formData.append('image', this.state.image);

    console.log('thipoprsimage', this.state.image);
    // console.log(formData.get('test'));

    let testObj = {
      image: this.state.image,
    };
    console.log('testOBJ', testObj);
    this.props.addImage(this.props.newestItem.id, this.state.image);

    return this.props.resetNewItem();
  }

  componentDidMount() {
    // return console.log('94it93it349ti3', this.props.currentUser);
  }

  render() {
    if (this.props.newestItem === '') {
      console.log('hide', this.props.newestItem);
      return <div />;
    } else {
      console.log('show', this.props.newestItem);
      return (
        <div id="myModal">
          <div id="modal-content">
            <div id="formHeader">
              <h3>Your item has been posted.</h3>

              <h4>Would you like to add an image to your new item?</h4>
              <form>
                <input onChange={this.handleInputOnChange} type="file" name="image" />
                <button onClick={this.handleSubmit}>Submit Item</button>
              </form>
            </div>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    images: state.itemReducer.images,
    currentUser: state.userReducer.user,
    newestItem: state.itemReducer.newestItem,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => {
      dispatch(addItem(item));
    },
    resetNewItem: (item) => {
      dispatch(resetNewItem(item));
    },
    addImage: (id, image) => {
      dispatch(addImage(id, image));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddItemImage);
