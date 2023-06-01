import { useEffect, useState } from "react";
import { Button, Form, Table } from 'react-bootstrap';
import styles from './Veiculo.module.css'
import api from "../service/api";
import { BsTrash } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';


function Veiculo() {
  let [veiculos, setVeiculos] = useState([]);
  let [marca, setMarca] = useState('');
  let [modelo, setModelo] = useState('');
  let [ano, setAno] = useState('');
  let [placa, setPlaca] = useState('');
  let [isAlteracao, setIsAlteracao] = useState(false);
  let [placaAntiga, setPlacaAntiga] = useState('');



  async function salvar() {
    let veiculo = {
      marca: marca,
      modelo: modelo,
      ano: Number(ano),
      placa: placa
    }

    const resposta = await api.post('/veiculos', veiculo)
      .catch((e) => {
        alert(e.response.data.msg)
      })

    veiculos.push(resposta.data)

    setVeiculos([...veiculos])

    limparForm()
  }

  async function excluir(veiculo) {

    const resposta = await api.delete(`/veiculos/${veiculo.placa}`)

    veiculos.forEach((v, i) => {
      if (resposta.data.placa == v.placa) {
        veiculos.splice(i, 1)
      }
    })
    setVeiculos([...veiculos])
  }
  //limpar forme
  function limparForm() {
    setAno('')
    setPlaca('')
    setMarca('')
    setModelo('')
  }

  useEffect(() => {
    buscarVeiculos();
  }, [])

  async function buscarVeiculos() {
    //array veiculos
    const resposta = await api.get('/veiculos')
    setVeiculos(resposta.data)
  }
  function setInputsEditar(veiculo) {
    setIsAlteracao(true)
    setPlacaAntiga(veiculo.placa)

    setPlaca(veiculo.placa)
    setMarca(veiculo.marca)
    setModelo(veiculo.modelo)
    setAno(veiculo.ano)
  }

  async function editar() {
    let veiculo = {
      marca: marca,
      modelo: modelo,
      ano: Number(ano),
      placa: placa
    }

    const resposta = await api.put(`/veiculos/${placaAntiga}`, veiculo)
      .catch((e) => {
        alert(e.response.data.msg)
      })

    //veiculos.find(veiculo => {return veiculo.placa == placaAntiga}) = resposta.data

    veiculos.forEach((veiculo, i) => {
      if (veiculo.placa == placaAntiga) {
        veiculos[i] = resposta.data
      }
    })
    setVeiculos([...veiculos])

    limparForm()
  }

  return (
    <div className={styles.main}>
      <h1>Veiculo</h1>
      <span>{placaAntiga}</span>
      <Form.Control
        value={placa}
        onChange={(e) => { setPlaca(e.target.value) }}
        placeholder="Placa"
        aria-label="Placa"
        aria-describedby="basic-addon1"
      />
      <Form.Control
        value={marca}
        onChange={(e) => { setMarca(e.target.value) }}
        placeholder="Marca"
        aria-label="Marca"
        aria-describedby="basic-addon1"
      />
      <Form.Control
        value={modelo}
        onChange={(e) => { setModelo(e.target.value) }}
        placeholder="Modelo"
        aria-label="Modelo"
        aria-describedby="basic-addon1"
      />
      <Form.Control
        value={ano}
        onChange={(e) => { setAno(e.target.value) }}
        placeholder="Ano"
        aria-label="Ano"
        aria-describedby="basic-addon1"
      />
      {
        isAlteracao &&
        (<Button onClick={editar}>Editar</Button>)
      }
      {
        !isAlteracao &&
        (<Button onClick={salvar}>Salvar</Button>)
      }
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <td>Placa</td>
            <td>Marca</td>
            <td>Modelo</td>
            <td>Ano</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {
            veiculos.map((veiculo, i) => {
              return (
                <tr key={i}>
                  <td>{veiculo.placa}</td>
                  <td>{veiculo.marca}</td>
                  <td>{veiculo.modelo}</td>
                  <td>{veiculo.ano}</td>
                  <td>
                    <Button onClick={() => { excluir(veiculo) }}>
                      <BsTrash />
                    </Button>
                    <Button onClick={() => { setInputsEditar(veiculo) }}>
                      <AiOutlineEdit />
                    </Button>
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
    </div>
  );
}

export default Veiculo;