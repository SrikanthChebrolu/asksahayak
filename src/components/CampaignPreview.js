import React from 'react';
import { Link } from 'react-router-dom';
import agent from '../agent';
import { connect } from 'react-redux';
import { CAMPAIGN_FAVORITED, CAMPAIGN_UNFAVORITED } from '../constants/actionTypes';
import Checkout from './Stripe/checkout';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: CAMPAIGN_FAVORITED,
    payload: agent.Campaigns.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: CAMPAIGN_UNFAVORITED,
    payload: agent.Campaigns.unfavorite(slug)
  })
});

const campaignPreview = props => {
  const campaign = props.campaign;
  const favoriteButtonClass = campaign.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (campaign.favorited) {
      props.unfavorite(campaign.slug);
    } else {
      props.favorite(campaign.slug);
    }
  };

  return (
    <div className="campaign-preview">
      <div className="campaign-meta">
        <Link to={`/@${campaign.author.username}`}>
          <img src={campaign.author.image} alt={campaign.author.username} />
        </Link>

        <div className="info">
          <Link className="author" to={`/@${campaign.author.username}`}>
            {campaign.author.username}
          </Link>
          <span className="date">
            {new Date(campaign.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {campaign.favoritesCount}
          </button>
        </div>

        <div className="pull-xs-right">
          <Checkout
              name={'AskSahayak'}
              description={'Lets Grow Together'}
              amount={campaign.amount}
          />
        </div>
      </div>

      <Link to={`/campaign/${campaign.slug}`} className="preview-link">

            <h5>{campaign.title}</h5>
            <h6>{campaign.description}</h6>
            <p >{campaign.body}</p>
            <span>Read more...</span>

        <ul className="tag-list">
          {
            campaign.tagList.map(tag => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              )
            })
          }
        </ul>
      </Link>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(campaignPreview);
