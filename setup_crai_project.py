#!/usr/bin/env python3
"""
Script de inicialização completo do projeto CRAI - Retention OS
"""
import os
import sys
from pathlib import Path

class CRAIProjectGenerator:
    def __init__(self, project_root: str = "crai_project"):
        self.root = Path(project_root)
    
    def create_directory_structure(self):
        """Cria estrutura de pastas"""
        print("Criando estrutura do projeto...")
        self.root.mkdir(exist_ok=True)
        print(f"✓ Pasta criada: {self.root}")
    
    def generate(self):
        print("\n" + "="*60)
        print("🚀 CRAI - Retention OS Project Setup")
        print("="*60 + "\n")
        self.create_directory_structure()
        print("\n✅ Projeto criado com sucesso!")
        print(f"📁 Pasta: {self.root}")

if __name__ == "__main__":
    generator = CRAIProjectGenerator("crai_project")
    generator.generate()
