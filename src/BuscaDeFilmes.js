// BuscaDeFilmes.js
import React, { useState } from 'react';
import './BuscaDeFilmes.css'; // Importando o CSS para estilizar a página

function BuscaDeFilmes() {
    const [query, setQuery] = useState('');
    const [filmes, setFilmes] = useState([]);
    const [erro, setErro] = useState('');

    // Função que faz a busca dos filmes
    const buscarFilmes = async () => {
        try {
            const response = await fetch(`http://www.omdbapi.com/?s=${query}&apikey=6e54b400`);
            const data = await response.json();

            if (data.Response === 'True') {
                setFilmes(data.Search);
                setErro('');
            } else {
                setFilmes([]);
                setErro(data.Error);
            }
        } catch (error) {
            console.error('Erro ao buscar filmes:', error);
            setErro('Erro ao buscar filmes. Por favor, tente novamente mais tarde.');
        }
    };

    // Função para lidar com a mudança no input
    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    // Função que lida com o envio do formulário
    const handleSubmit = (event) => {
        event.preventDefault();
        buscarFilmes();
    };

    return (
        <div className="container">
            <h2>Busca de Filmes</h2>
            <form onSubmit={handleSubmit} className="form">
                <input
                    type="text"
                    value={query}
                    onChange={handleChange}
                    placeholder="Digite o nome do filme"
                    className="input"
                />
                <button type="submit" className="button">Buscar</button>
            </form>
            {erro && <p className="erro">{erro}</p>}
            <div className="resultados">
                {filmes.length > 0 && filmes.map((filme) => (
                    <div key={filme.imdbID} className="filme">
                        <h3>{filme.Title}</h3>
                        <img src={filme.Poster} alt={filme.Title} className="poster" />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BuscaDeFilmes;
