import logo from './logo.svg';
import './App.css';
import SearchForm from './components/SearchForm'
import styled from 'styled-components';

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

function App() {
  return (
    <div className="App" style={{ 
        backgroundImage: `url(${process.env.PUBLIC_URL + '/bg.jpg'})` 
      }}>
        <Container>
            <h1 className='title'>Bifrost</h1>
            <SearchForm />
        </Container>
    </div>
  );
}

export default App;
