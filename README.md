# Tic-Tac-Toe
Tic-tac-toe game from the odin project. This project demonstrates my ability to write functional, decoupled and modularized code. This is my attempt at writing code that is significantly easier to read, easier to debug, and more performant than the spaghettified, DOM-coupled, alternative.

<p align="center">
  <a href="YOUR_LIVE_DEMO_URL">
    <img
      src="./assets/visit-now.gif"
      alt="Visit Now"
      width="180"
    />
  </a>
</p>

<img width="1470" height="775" alt="Screenshot 2026-10-02 at 3 08 07 PM" src="https://github.com/user-attachments/assets/db208498-e216-4ef1-913e-8c8031f20fc3" />


Things to remember:
1. Always remember to expose methods in factory functions.
2. Private variables are bundled with objects. Don' think it's the same copy accross all objects.
3. Do not forget to add 'defer' inside <script>
4. LUL - for diagonal result check '==' works but '===' doesn't. Don't know why. '===' returns false when it should be true.
5. Should've thought about reset logic before starting to work on UI. This caused many problems. Reset board, map, winner, count. Leaving any one of these results in error.
