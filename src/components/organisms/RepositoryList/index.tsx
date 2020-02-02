import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../../store';
import { ActionsList, Repository } from '../../../store/ducks/repositories';

interface StateProps {
  repositories: Repository[];
}

interface DispatchProps {
  loadRequest(): void;
}

type Props = StateProps & DispatchProps;

class RepositoryList extends Component<Props> {
  componentDidMount() {
    const { loadRequest } = this.props;
    loadRequest();
  }

  render() {
    const { repositories } = this.props;
    return (
      <ul>
        {repositories.map(repository => (
          <li key={repository.id}>{repository.name}</li>
        ))}
      </ul>
    );
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  repositories: state.repositories.data,
});

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(ActionsList, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(RepositoryList);
