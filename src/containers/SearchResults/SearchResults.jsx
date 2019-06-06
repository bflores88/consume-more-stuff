import React, {Component} from 'react';
import {connect} from 'react-redux';
import './SearchResults.scss';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      debugMessage: 'This is the search results',
    }
  }

  render() {
    // console.log('wildProp ', this.props.wildProp);
    let x;

    if (this.props.wildProp.length > 0){
      x = this.props.wildProp[0].name;
    } else {
      x = 'No Results';
    }

    return (
      <div className="search-results">
        {this.state.debugMessage}
        {x}
        {/* {this.state.wildProp[0].name} */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('search results mapStateToProps, ', state.itemReducer.searchResults);
  return {
    wildProp: state.itemReducer.searchResults
  }
}

SearchResults = connect(
  mapStateToProps,
  null
)(SearchResults);

export default SearchResults;