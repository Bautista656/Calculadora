from pathlib import Path

def test_index_tiene_titulo_cd():
    html = Path("index.html").read_text(encoding="utf-8")

    assert "<title>Calculadora CD</title>" in html
    assert "<h1>Calculadora CD</h1>" in html