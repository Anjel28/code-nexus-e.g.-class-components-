import React, { Component } from 'react';


class CodeRepository extends Component {
  render() {
    const { repo } = this.props;
    return (
      <div className="code-repo">
        <h3>{repo.name}</h3>
        <p>{repo.description}</p>
        <div className="repo-meta">
          <span>Language: {repo.language}</span>
          <span>Stars: {repo.stars}</span>
        </div>
        <button onClick={() => this.props.onSelect(repo.id)}>View Details</button>
      </div>
    );
  }
}

class CodeNexus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repositories: [],
      selectedRepo: null,
      loading: true,
      searchTerm: ''
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        repositories: [
          {
            id: 1,
            name: 'React Core',
            description: 'The core library for building user interfaces',
            language: 'JavaScript',
            stars: 180000
          },
          {
            id: 2,
            name: 'Vue.js',
            description: 'The Progressive JavaScript Framework',
            language: 'JavaScript',
            stars: 190000
          },
          {
            id: 3,
            name: 'Django',
            description: 'A high-level Python Web framework',
            language: 'Python',
            stars: 62000
          }
        ],
        loading: false
      });
    }, 1000);
  }

  handleRepoSelect = (repoId) => {
    const selectedRepo = this.state.repositories.find(repo => repo.id === repoId);
    this.setState({ selectedRepo });
  };

  handleSearchChange = (e) => {
    this.setState({ searchTerm: e.target.value });
  };

  getFilteredRepos = () => {
    const { repositories, searchTerm } = this.state;
    if (!searchTerm) return repositories;
    
    return repositories.filter(repo => 
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.language.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  render() {
    const { loading, selectedRepo, searchTerm } = this.state;
    const filteredRepos = this.getFilteredRepos();

    return (
      <div className="code-nexus">
        <header>
          <h1>Code Nexus</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={this.handleSearchChange}
            />
          </div>
        </header>

        <main>
          {loading ? (
            <div className="loading">Loading repositories...</div>
          ) : (
            <div className="repo-container">
              <div className="repo-list">
                {filteredRepos.length > 0 ? (
                  filteredRepos.map(repo => (
                    <CodeRepository 
                      key={repo.id} 
                      repo={repo} 
                      onSelect={this.handleRepoSelect}
                    />
                  ))
                ) : (
                  <div className="no-results">No repositories found</div>
                )}
              </div>

              {selectedRepo && (
                <div className="repo-details">
                  <h2>{selectedRepo.name}</h2>
                  <p><strong>Language:</strong> {selectedRepo.language}</p>
                  <p><strong>Stars:</strong> {selectedRepo.stars}</p>
                  <p><strong>Description:</strong> {selectedRepo.description}</p>
                  <button onClick={() => this.setState({ selectedRepo: null })}>
                    Close
                  </button>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    );
  }
}

export default CodeNexus;