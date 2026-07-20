#!/bin/bash
echo "📊 C25 Swarm Status Report"
echo "=========================="
sqlite3 ../data/swarm-state.db "SELECT name, domain, status FROM agents;"
