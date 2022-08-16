import {Icon, NavSection, Text} from 'jera-design-ui';
import React from 'react';

const Top: React.FC = () => (
  <>
    <NavSection>
      <Text.Title>Top</Text.Title>
      <></>
      <></>
    </NavSection>
    <div className="uk-section uk-section-muted uk-flex">
      <div className="uk-container">
        <Text.Middle>
          ↖︎ Click the menu button(
          <Icon name="menu" />
          ) to open the examples list.
        </Text.Middle>
      </div>
    </div>
  </>
);

export {
  Top,
};
