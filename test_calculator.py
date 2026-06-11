import pytest
from calculator import sumar, restar, multiplicar, dividir


def test_sumar():
    assert sumar(5, 3) == 8


def test_restar():
    assert restar(10, 4) == 6


def test_multiplicar():
    assert multiplicar(6, 3) == 18


def test_dividir():
    assert dividir(20, 5) == 4


def test_dividir_entre_cero():
    with pytest.raises(ValueError):
        dividir(10, 0)