import React, {Component} from 'react';
import {connect} from 'react-redux';
import SearchResult from '../../components/SearchResult';
import './SearchResults.scss';

class SearchResults extends Component {
  constructor(props) {
    super(props);

    this.state = {
      headerMessage: 'This is the search results',
    }
  }

  render() {
    console.log('wildProp ', this.props.wildProp);
    let searchResults;

    if (this.props.wildProp.length > 0){
      searchResults = this.props.wildProp.map((result) => {
        return <SearchResult value={result}/>
      });
    } else {
      searchResults = 'No Results';
    }

    return (
      <div className="search-results">
        <h1>{this.state.headerMessage}</h1>
        {searchResults}
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