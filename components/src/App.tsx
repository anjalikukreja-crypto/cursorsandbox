import { Card } from './Card';
import './App.css';

function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 48,
      }}
    >
      <Card
        heading="Welcome"
        subtext="Get started with our platform in just a few steps."
        buttonLabel="Get Started"
      />
    </div>
  );
}

export default App;
