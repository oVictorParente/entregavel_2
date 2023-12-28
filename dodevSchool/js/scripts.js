////////////////////////////////////////////////////////////////////////
////////////////// FAÇA O SEU CÓDIGO AQUI \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
////////////////////////////////////////////////////////////////////////

class Aluno {
  Nome
  Idade
  Nota
  constructor(nome, idade, nota) {
    this.Nome = nome;
    this.Idade = idade;
    this.Nota = nota;
  }
}

// Array

let arrayAlunos = [];

//funções projeto

function CadastrarAluno(nome, idade, nota, array) {
  let aluno = new Aluno(nome, idade, nota);

  const usuarioExistente = array.find(x => x.Nome === nome);

    if(usuarioExistente) {
      console.log('erro');
    } 
    else {
      array.push(aluno);
      return aluno;
    }

}


function OrdenarPorNota(array) {
  array.sort((a, b) => a.Nota - b.Nota);

    return array;
  
}


function OrdenarPorIdade(array) {
  array.sort((a, b) => b.Idade - a.Idade);

    return array;
  
}


function OrdenarPorNome(array) {
  array.sort((a, b) => {
    const nomeA = a.Nome.toLowerCase();
    const nomeB = b.Nome.toLowerCase();

    if(nomeA < nomeB) {
      return -1;
    }

    if(nomeA > nomeB) {
      return 1;
    }

    return 0;
  });

  return array;
}


function CalcularMedia(array) {
  let totalNota = 0;
  let totalAlunos = array.length;

  for (let i = 0; i < array.length; i++) {
    totalNota += Number(array[i].Nota);
  }

  const mediaTotal = totalNota / totalAlunos;

  return mediaTotal;
}


////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function ExcluirAluno(array, nome) {
  let index
  let removido = false
  array.forEach(aluno => {
    if (aluno.Nome == nome) {
      index = array.indexOf(aluno)
      removido = true
    }
  })
  array.splice(index, 1)
  return removido
}

function PesquisarAluno(array, nome) {
  let pesquisa = false
  array.forEach(aluno => {
    if (aluno.Nome.includes(nome)) {
      pesquisa = true
    }
  })

  return pesquisa
}

// Seleção de elementos
const alunoForm = document.querySelector("#aluno-form");
const alunoInput = document.querySelector("#aluno-input");
const alunoInput2 = document.querySelector("#aluno-input-2");
const alunoInput3 = document.querySelector("#aluno-input-3");
const alunoList = document.querySelector("#aluno-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const searchInput = document.querySelector("#search-input");
const eraseBtn = document.querySelector("#erase-button");
const filterBtn = document.querySelector("#filter-select");

let oldInputValue;

// Funções
const saveAluno = (nome, idade, nota, done = 0, save = 1) => {
  let objetoAluno = CadastrarAluno(nome, idade, nota, arrayAlunos)

  const aluno = document.createElement("div");
  aluno.classList.add("aluno");

  const alunoNome = document.createElement("h3");
  alunoNome.innerText = objetoAluno.Nome;
  aluno.appendChild(alunoNome);

  const alunoIdade = document.createElement("h3");
  alunoIdade.innerText = objetoAluno.Idade;
  aluno.appendChild(alunoIdade);

  const alunoNota = document.createElement("h3");
  alunoNota.innerText = objetoAluno.Nota;
  aluno.appendChild(alunoNota);

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("remove-aluno");
  deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  aluno.appendChild(deleteBtn);

  // Utilizando dados da localStorage

  alunoList.appendChild(aluno);
  

  const media = document.querySelector("#media");
  media.textContent = CalcularMedia(arrayAlunos).toFixed(2)

  alunoInput.value = "";
  alunoInput2.value = "";
  alunoInput3.value = "";

};

const toggleForms = () => {
  editForm.classList.toggle("hide");
  alunoForm.classList.toggle("hide");
  alunoList.classList.toggle("hide");
};

const getBuscarAluno = (busca) => {
  const alunos = document.querySelectorAll(".aluno");

  let pesquisa = PesquisarAluno(arrayAlunos, busca)

  if (pesquisa) {
    alunos.forEach((aluno) => {
      const alunoNome = aluno.querySelector("h3").innerText.toLowerCase();

      aluno.style.display = "flex";

      if (!alunoNome.includes(busca)) {
        aluno.style.display = "none";
      }
    });
  };
}



function filterAlunos(filterValue) {
  const alunos = document.querySelectorAll(".aluno");

  switch (filterValue) {
    case "nota":
      arrayAlunos = OrdenarPorNota(arrayAlunos);
      break;

    case "idade":
      arrayAlunos = OrdenarPorIdade(arrayAlunos);
      break;

    case "nome":
      arrayAlunos = OrdenarPorNome(arrayAlunos)
      break;

    default:
      break;
  }

  // Atualize os elementos existentes com base no array ordenado
  alunos.forEach((aluno, index) => {
    const alunoNome = aluno.querySelector("h3");
    const alunoIdade = aluno.querySelector("h3 + h3");
    const alunoNota = aluno.querySelector("h3 + h3 + h3");

    if (arrayAlunos[index]) {
      alunoNome.innerText = arrayAlunos[index].Nome;
      alunoIdade.innerText = arrayAlunos[index].Idade;
      alunoNota.innerText = arrayAlunos[index].Nota;
    }
  });
}


// Eventos
alunoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputValue = alunoInput.value;
  const inputValue2 = alunoInput2.value;
  const inputValue3 = alunoInput3.value;

  if (inputValue && inputValue2 && inputValue3) {
    saveAluno(inputValue, inputValue2, inputValue3);
  }
});

document.addEventListener("click", (e) => {
  const targetEl = e.target;
  const parentEl = targetEl.closest("div");
  let alunoTitle;

  if (parentEl && parentEl.querySelector("h3")) {
    alunoTitle = parentEl.querySelector("h3").innerText || "";
  }

  if (targetEl.classList.contains("remove-aluno")) {
    alunoTitle = parentEl.querySelector("h3").innerText
    let removido = ExcluirAluno(arrayAlunos, alunoTitle)
    if (removido) {
      parentEl.remove();

      // Utilizando dados da localStorage

    }

  }
});

searchInput.addEventListener("keyup", (e) => {
  const busca = e.target.value;

  getBuscarAluno(busca);
});

eraseBtn.addEventListener("click", (e) => {
  e.preventDefault();

  searchInput.value = "";

  searchInput.dispatchEvent(new Event("keyup"));
});

filterBtn.addEventListener("change", (e) => {
  const filterValue = e.target.value;

  filterAlunos(filterValue);
});

// Local Storage

// const loadAlunos = () => {

//   arrayAlunos.forEach((aluno) => {
//     saveAluno(aluno.Nome, aluno.Idade, aluno.Nota, 0);
//   });
// };

// loadAlunos();
