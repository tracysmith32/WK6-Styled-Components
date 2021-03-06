import { useEffect, useState } from 'react';

import {
	Container,
	Image,
	Tile,
	Wrapper,
	Button,
	H1,
	H3,
	H5,
} from '../src/styles/App.styles';
import Navbar from '../src/components/Navbar';
import Buttons from './components/Button';

const App = () => {
	const [characters, setCharacters] = useState([]);
	const [error, setError] = useState(null);
	console.log(characters);

	useEffect(() => {
		const fetchCharacters = async () => {
			try {
				const response = await fetch(
					'https://www.breakingbadapi.com/api/characters?limit=9&offset=9',
				);
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				const data = await response.json();
				setCharacters(data);
			} catch (err) {
				setError('Could not fetch data');
				console.log(err.message);
			}
		};
		fetchCharacters();
	}, []);

	return (
		<>
			<Navbar />
			<Container>
				{error && <p>{error}</p>}
				<Wrapper>
					{characters.map((character) => (
						<Tile key={character.char_id}>
							<H1>{character.name}</H1>
							<H3>{character.occupation}</H3>
							<Image src={character.img} alt="breaking bad characters"></Image>
							<H5>{character.status}</H5>
							<Button backgroundColor="crimson">Add to Favourites</Button>
						</Tile>
					))}
				</Wrapper>
			</Container>
			<Buttons />
		</>
	);
};

export default App;
