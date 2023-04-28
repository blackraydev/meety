import * as UI from './Loader.styles';

export const Loader = () => {
  return (
    <UI.Loader>
      <UI.Circular viewBox="25 25 50 50">
        <UI.Path r="20" cy="50" cx="50"></UI.Path>
      </UI.Circular>
    </UI.Loader>
  );
};
