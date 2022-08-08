import Window from './Window';

const Alert = ({ alerts }) => {
  return (
    <Window className='window-alerts' title={alerts.event}>
      <p>{alerts.descrip.replace(/\.\.\./g, '__')}</p>
    </Window>
  );
};

export default Alert;
