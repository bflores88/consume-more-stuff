import React from 'react';
import {connect} from 'react-redux';
import SearchResult from '../../components/SearchResult';
import './SearchResults.scss';

const SearchResults = (props) => {
  let headerMessage;
  let searchResults;

  if (props.wildProp.length > 0){
    headerMessage = "Found " + props.wildProp.length + " Results!";
    searchResults = props.wildProp.map((result) => {
      return <SearchResult value={result} key={props.wildProp.indexOf(result)}/>
    });
  } else {
    headerMessage = "No Results. Search again for something else.";
  }

  return (
    <div className="search-results">
      <h1>{headerMessage}</h1>
      <ul>
        {searchResults}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    wildProp: state.itemReducer.searchResults
  }
}

export default connect(mapStateToProps)(SearchResults);