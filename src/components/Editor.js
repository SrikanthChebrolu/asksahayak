import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
    ADD_TAG,
    EDITOR_PAGE_LOADED,
    REMOVE_TAG,
    CAMPAIGN_SUBMITTED,
    EDITOR_PAGE_UNLOADED,
    UPDATE_FIELD_EDITOR
} from '../constants/actionTypes';

const mapStateToProps = state => ({
    ...state.editor
});

const mapDispatchToProps = dispatch => ({
    onAddTag: () =>
        dispatch({ type: ADD_TAG }),
    onLoad: payload =>
        dispatch({ type: EDITOR_PAGE_LOADED, payload }),
    onRemoveTag: tag =>
        dispatch({ type: REMOVE_TAG, tag }),
    onSubmit: payload =>
        dispatch({ type: CAMPAIGN_SUBMITTED, payload }),
    onUnload: payload =>
        dispatch({ type: EDITOR_PAGE_UNLOADED }),
    onUpdateField: (key, value) =>
        dispatch({ type: UPDATE_FIELD_EDITOR, key, value })
});

class Editor extends React.Component {
    constructor() {
        super();

        const updateFieldEvent =
            key => ev => this.props.onUpdateField(key, ev.target.value);
        this.changeTitle = updateFieldEvent('title');
        this.changeDescription = updateFieldEvent('description');
        this.changeBody = updateFieldEvent('body');
        this.changeAmount = updateFieldEvent('amount');
        this.changeTagInput = updateFieldEvent('tagInput');

        this.watchForEnter = ev => {
            if (ev.keyCode === 13) {
                ev.preventDefault();
                this.props.onAddTag();
            }
        };

        this.removeTagHandler = tag => () => {
            this.props.onRemoveTag(tag);
        };

        this.submitForm = ev => {
            ev.preventDefault();
            const campaign = {
                title: this.props.title,
                description: this.props.description,
                body: this.props.body,
                amount: this.props.amount,
                tagList: this.props.tagList
            };

            const slug = { slug: this.props.campaignSlug };
            const promise = this.props.campaignSlug ?
                agent.Campaigns.update(Object.assign(campaign, slug)) :
                agent.Campaigns.create(campaign);

            this.props.onSubmit(promise);
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.match.params.slug !== nextProps.match.params.slug) {
            if (nextProps.match.params.slug) {
                this.props.onUnload();
                return this.props.onLoad(agent.Campaigns.get(this.props.match.params.slug));
            }
            this.props.onLoad(null);
        }
    }

    componentWillMount() {
        if (this.props.match.params.slug) {
            return this.props.onLoad(agent.Campaigns.get(this.props.match.params.slug));
        }
        this.props.onLoad(null);
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    render() {
        return (
            <div className="editor-page">
              <div className="container page">
                <div className="row">
                  <div className="col-md-10 offset-md-1 col-xs-12">

                    <ListErrors errors={this.props.errors}></ListErrors>

                    <form>
                      <fieldset>

                        <fieldset className="form-group">
                          <label for="inputEmail4">Amount</label>
                          <input
                              className="form-control"
                              type="number"
                              placeholder="Amount you want to raise"
                              value={this.props.amount}
                              onChange={this.changeAmount} />
                        </fieldset>

                        <fieldset className="form-group">
                          <label for="inputEmail4">Campaign Title</label>
                          <input
                              className="form-control"
                              type="text"
                              placeholder="Campaign Title"
                              value={this.props.title}
                              onChange={this.changeTitle} />
                        </fieldset>

                        <fieldset className="form-group">
                          <label for="inputEmail4">Description</label>
                          <input
                              className="form-control"
                              type="text"
                              placeholder="Few words about your story"
                              value={this.props.description}
                              onChange={this.changeDescription} />
                        </fieldset>

                        <fieldset className="form-group">
                          <label for="inputEmail4">Full Story</label>
                          <textarea
                              className="form-control"
                              rows="6"
                              placeholder="Tell your story"
                              value={this.props.body}
                              onChange={this.changeBody}>
                    </textarea>
                        </fieldset>

                        <fieldset className="form-group">
                          <label for="inputEmail4">Tags</label>
                          <input
                              className="form-control"
                              type="text"
                              placeholder="Enter tags"
                              value={this.props.tagInput}
                              onChange={this.changeTagInput}
                              onKeyUp={this.watchForEnter} />

                          <div className="tag-list">
                              {
                                  (this.props.tagList || []).map(tag => {
                                      return (
                                          <span className="tag-default tag-pill" key={tag}>
                              <i  className="ion-close-round"
                                  onClick={this.removeTagHandler(tag)}>
                              </i>
                                              {tag}
                            </span>
                                      );
                                  })
                              }
                          </div>
                        </fieldset>

                        <button
                            className="btn btn-lg pull-xs-right btn-primary"
                            type="button"
                            disabled={this.props.inProgress}
                            onClick={this.submitForm}>
                          Publish
                        </button>

                      </fieldset>
                    </form>

                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
