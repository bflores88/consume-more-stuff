import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {connect} from 'react-redux';
import {searchItems} from '../../actions';
import './SearchBar.scss';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
    }

    this.handleSearchTermChange = this.handleSearchTermChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSearchTermChange(e) {
    const {value} = e.target;
    this.setState({searchTerm : value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.searchItems(this.state.searchTerm).then((body) => {
      // console.log(body);
      this.props.history.push('/search-results');
    });
  }

  render() {
    return (
      <div id="search-bar-box">
        <form>
          <input type="text" onChange={this.handleSearchTermChange}/>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchItems: (searchTerm) => {
      const searchItemsAction = searchItems(searchTerm);
      return dispatch(searchItemsAction);
    }
  }
}

SearchBar = connect(
  null,
  mapDispatchToProps,
)(SearchBar);

const SearchBarWithRouter = withRouter(SearchBar);
export default SearchBarWithRouter;