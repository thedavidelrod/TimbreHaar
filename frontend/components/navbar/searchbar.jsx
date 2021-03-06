class Searchbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: "",
      sounds: "",
      users: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.noMatches = this.noMatches.bind(this);
    this.matches = this.matches.bind(this);
  }

  componentDidMount() {
    if (this.props.users) {
      this.setState({
        users: this.props.users,
      });
    } else {
      this.setState({
        sounds: this.props.sounds,
      });
    }
  }

  noMatches() {
    return (
      <div className="search-results-container">
        <div className="results-item">No results found</div>
      </div>
    );
  }

  handleInputChange(e) {
    let { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  matches() {
    let { input, users, venues } = this.state;
    const matches = [];
    if (input.length === 0) {
      return "";
    }

    if (users.length > 0) {
      Object.values(users).forEach((user) => {
        if (user.username.toLowerCase().includes(input.toLowerCase())) {
          matches.push(user);
        }
      });
    } else {
      Object.values(venues).forEach((venue) => {
        if (venue.name.toLowerCase().includes(input.toLowerCase())) {
          matches.push(venue);
        }
      });
    }

    return matches;
  }

  render() {
    let { input, users } = this.state;
    let results;
    let matches = this.matches();
    if (matches.length === 0) {
      results = "";
    } else {
      if (users.length > 0) {
        results = matches.map((result, i) => {
          return (
            <li className="search-results" key={i}>
              <Link to={`/profile/${result._id}`}>
                <div className="results-item">{result.username}</div>
              </Link>
            </li>
          );
        });
      } else {
        results = matches.map((result, i) => {
          return (
            <li className="search-results" key={i}>
              <div className="results-item">{result.name}</div>
            </li>
          );
        });
      }
    }
    return (
      <Fragment>
        <input
          type="text"
          name="input"
          value={input}
          onChange={this.handleInputChange}
          placeholder="Search"
        />

        {results.length < 1 && input.length > 0 ? (
          this.noMatches()
        ) : (
          <div className="search-results-container">
            <ul>{results}</ul>
          </div>
        )}
      </Fragment>
    );
  }
}

export default Searchbar;
