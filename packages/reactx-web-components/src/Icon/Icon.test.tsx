import React from "react";
import {render,cleanup} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import {Icon} from "./Icon";

afterEach(cleanup);

describe('Icon',  () => {
  it('renders the correct class for the name prop',()=>{
    const {getByText} = render(<Icon name='search'>Search</Icon>);
    expect(getByText('Search')).toHaveClass('icon-search')
  });
});
