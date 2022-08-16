import {Text} from 'jera-design-ui';
import React from 'react';

const NotFound: React.FC = () => (
  <div className="uk-section uk-section-muted uk-flex">
    <div className="uk-container">
      <Text.Large>Page Not Found.</Text.Large>
    </div>
  </div>
);

export {
  NotFound,
};
