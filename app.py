from calculator import sumar, restar, multiplicar, dividir


def mostrar_menu():
    print("Calculadora simple")
    print("1. Sumar")
    print("2. Restar")
    print("3. Multiplicar")
    print("4. Dividir")


def main():
    mostrar_menu()

    opcion = input("Elige una opción: ")

    numero1 = float(input("Ingresa el primer número: "))
    numero2 = float(input("Ingresa el segundo número: "))

    if opcion == "1":
        resultado = sumar(numero1, numero2)
    elif opcion == "2":
        resultado = restar(numero1, numero2)
    elif opcion == "3":
        resultado = multiplicar(numero1, numero2)
    elif opcion == "4":
        resultado = dividir(numero1, numero2)
    else:
        print("Opción no válida")
        return

    print(f"El resultado es: {resultado}")


if __name__ == "__main__":
    main()