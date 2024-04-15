export const ShuffleList = ( lista : any[]) => {
    let currentIndex = lista.length,  randomIndex;


    while (currentIndex != 0) {
  

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  

      [lista[currentIndex], lista[randomIndex]] = [
        lista[randomIndex], lista[currentIndex]];
    }
  
    return lista;

}

export function seleccionarFrases(frases: string[]): string[] {
  let frasesSeleccionadas: string[] = [];
  
  if (frases.length >= 5) {
    const indiceAleatorio = Math.floor(Math.random() * (frases.length - 4)) + 1;
    frasesSeleccionadas = frases.slice(indiceAleatorio, indiceAleatorio + 3);
    frasesSeleccionadas.unshift(frases[indiceAleatorio - 1]); // Añade la frase anterior
    frasesSeleccionadas.push(frases[indiceAleatorio + 3]); // Añade la frase siguiente
  } else if (frases.length > 0) {
    frasesSeleccionadas = [...frases]; // Devuelve todas las frases si hay menos de 5
  }

  return frasesSeleccionadas;
}
