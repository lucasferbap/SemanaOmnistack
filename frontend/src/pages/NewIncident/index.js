import React from 'react'
import './styles.css'
import logoImg from '../../assets/logo.svg'
import { Link, useHistory} from 'react-router-dom'
import { FiArrowLeft} from 'react-icons/fi'
import { useState } from 'react'
import api from '../../services/api'

export default function NewIncident(){
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId')
    const history = useHistory();

    async function handleNewIncident(e){
        e.preventDefault();
        const data = {
            title,
            description,
            value
        }
        try {
            await api.post('incidents', data, {
                headers:{
                    Authorization : ongId
            }})
            history.push('/profile')
        } catch (error) {
            console.log(error)
            alert('Erro ao cadastrar o caso')
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamenrte para encontar um heroi para resolver isso</p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para home
                    </Link>
                </section>

                <form>
                    <input 
                        placeholder="Título do caso" type="text"
                        value={title}
                        onChange={e => setTitle(e.target.value)}

                    />
                    <textarea 
                        placeholder="Descrição" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em Reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button onClick={handleNewIncident} className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}