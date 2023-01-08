import { Component } from "react";
import css from "../SearchBar/searchBar.module.css"

class SearchBar extends Component {

    render(){
        return (
            <header className="searchbar">
  <form className={css.form} onSubmit={this.props.onSubmit}>
    <input
      className={css.input}
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