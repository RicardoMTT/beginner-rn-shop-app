import {useEffect, useState} from 'react';

export const useDebouncedValue = (input: string = '', time: number = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(input);

  /*
  En resumen, este código es un ejemplo de un debouncing, que es una técnica utilizada para limitar la cantidad de veces
  que una función se ejecuta en un período de tiempo específico
  */
  useEffect(() => {
    // se activa despues de 500 por default
    const timeout = setTimeout(() => {
      setDebouncedValue(input);
    }, time);

    //cada vez que presiono una tecla se destruye
    return () => {
      console.log('destruye');
      clearTimeout(timeout); //limpiar el temporizador, lo que significa que el efecto secundario solo se llamará si la variable input cambia.
    };
  }, [input]);

  return debouncedValue;
};
