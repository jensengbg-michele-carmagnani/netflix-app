import Row from "./Row";
import { render, screen } from "@testing-library/react";

describe("<Row.js> component is present", () => {
  test("renders the img tag", () => {
    const props = {
      title: " ",
      fetchUrl: "",
      isLargeRow: true,
    };
    render(<Row {...props} />);
    const debug = screen.debug()
    expect(screen.getByRole('a')).toBeDefined()
    
    
  });
});
