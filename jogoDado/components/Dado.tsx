import { Image, StyleSheet } from "react-native";

type DadoProps = {
  valor: number;
};

// No React Native não é possível usar caminhos dinâmicos (`/images/${valor}.png`)
// com `require`, pois o Metro bundler precisa resolver os caminhos estaticamente
// em tempo de build. Por isso, mapeamos cada valor possível para seu require.
const imagensDados: Record<number, any> = {
  1: require("../assets/images/1.png"),
  2: require("../assets/images/2.png"),
  3: require("../assets/images/3.png"),
  4: require("../assets/images/4.png"),
  5: require("../assets/images/5.png"),
  6: require("../assets/images/6.png"),
};

export const Dado = ({ valor }: DadoProps) => {
  // Estado inicial (valor 0) não tem imagem correspondente, então não renderiza nada
  if (valor === 0) {
    return null;
  }

  return (
    <Image
      source={imagensDados[valor]}
      accessibilityLabel={`Dado ${valor}`}
      style={styles.dado}
    />
  );
};

const styles = StyleSheet.create({
  dado: {
    width: 100,
    height: 100,
  },
});