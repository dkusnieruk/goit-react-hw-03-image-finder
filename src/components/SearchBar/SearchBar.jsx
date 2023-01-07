import { Component } from "react";

class SearchBar extends Component {

    render(){
        return (
            <header className="searchbar">
  <form className="form" onSubmit={this.props.onSubmit}>
    <button 
    type="submit" 
    className="button"
    >
      <span className="button-label">Search</span>
    </button>

    <input
      className="input"
      type="text"
      autoComplete="off"
      name="filter"
      autoFocus
      placeholder="Search images and photos"
      value={this.props.filter}
      onChange={this.props.onChange}
    />
  </form>
</header>
        )
    }
}

export default SearchBar