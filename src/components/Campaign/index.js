import CampaignMeta from './CampaignMeta';
import CommentContainer from './CommentContainer';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import marked from 'marked';
import { CAMPAIGN_PAGE_LOADED, CAMPAIGN_PAGE_UNLOADED } from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.campaign,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: CAMPAIGN_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: CAMPAIGN_PAGE_UNLOADED })
});

class Campaign extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Campaigns.get(this.props.match.params.id),
      agent.Comments.forCampaign(this.props.match.params.id)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.campaign) {
      return null;
    }

    const markup = { __html: marked(this.props.campaign.body, { sanitize: true }) };
    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.campaign.author.username;
    return (
      <div className="campaign-page">

        <div className="banner">
          <div className="container">

            <h1>{this.props.campaign.title}</h1>
            <CampaignMeta
              campaign={this.props.campaign}
              canModify={canModify} />

          </div>
        </div>

        <div className="container page">

          <div className="row campaign-content">
            <div className="col-xs-12">

              <div dangerouslySetInnerHTML={markup}></div>

              <ul className="tag-list">
                {
                  this.props.campaign.tagList.map(tag => {
                    return (
                      <li
                        className="tag-default tag-pill tag-outline"
                        key={tag}>
                        {tag}
                      </li>
                    );
                  })
                }
              </ul>

            </div>
          </div>

          <hr />

          <div className="campaign-actions">
          </div>

          <div className="row">
            <CommentContainer
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.match.params.id}
              currentUser={this.props.currentUser} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Campaign);
