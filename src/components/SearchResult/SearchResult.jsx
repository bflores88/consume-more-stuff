import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import './SearchResult.scss';

const SearchResult = (props) => {
  let myMoment = moment();
  const result = props.value;

  return (
    <li className="search-result">
      <div>
        <img src={result.images[0].image_link}/>
      </div>
      <ul>
        <li><Link to={'/items/' + result.id} ><h2>{result.name}</h2></Link></li>
        <li><h4>Condition: {result.conditions.condition_name}</h4></li>
        
        <li><h4>Sold By: {result.users.username}</h4></li>
        <li><h4>{result.description}</h4></li>
        <li><h4>{myMoment.format('MMMM Do YYYY')}</h4></li>
      </ul>
    </li>
  );
}

export default SearchResult;