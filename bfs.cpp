#include <iostream>
#include <queue>
using namespace std;

void bfs(int matrice[][10], int iDim, int jDim, int iStart, int jStart, int iStop, int jStop)
{
    int di[4] = {1,  0, -1,  0}; // Vom folosi acești vectori pentru a parcurge toți vecinii
    int dj[4] = {0,  1,  0, -1}; // dreapta, jos, stânga, sus

    queue<pair<int,int>> coada; // Aici vor fi stocate coorodnatele parcurse

    matrice[iStart][jStart] = 1; // Inițiem parcurgerea
    coada.push(make_pair(iStart, jStart));

    while(!coada.empty()) // Vom parcurge bucla până când coada va rămâne goală
    {
        int iPoz = coada.front().first;
        int jPoz = coada.front().second;

        for (int k = 0; k < 4; k++)
        {
            int iVecin = iPoz + di[k];
            int jVecin = jPoz + dj[k];

            // Vom verifica dacă poziția se află in interiorul matricii și dacă este liberă
            if(iVecin>=0 && iVecin<iDim && jVecin >= 0 && jVecin < jDim && matrice[iVecin][jVecin]==0)
            {
                // Distanța de la start pănâ la noul vecin este mai mare cu 1 față de distanța până la poziția curentă
                matrice[iVecin][jVecin] = matrice[iPoz][jPoz] + 1;

                coada.push(make_pair(iVecin, jVecin)); // Adăugăm în coadă noua poziție găsită

                if(iVecin==iStop && jVecin == jStop)
                {
                    // Dacă am ajuns la poziția de stop putem opri programul
                    return;
                }
            }
        }
    }
}

int main()
{
    int matrice[6][10] = // Acesta este labirinul ce trebuie parcurs
    {
        { 0,  0,  0, -1, -1,  0,  0,  0, -1,  0}, // camerele notate cu 0 sunt libere
        {-1, -1,  0, -1,  0, -1,  0,  0,  0, -1}, // camerele notate cu -1 sunt blocate
        {-1,  0,  0,  0,  0,  0,  0, -1, -1,  0},
        {-1, -1, -1,  0, -1, -1, -1,  0, -1,  0},
        {-1,  0,  0, -1, -1,  0, -1,  0,  0,  0},
        {-1,  0,  0, -1, -1,  0,  0,  0,  0,  0}
    };

    int iStart = 0, jStart = 0; // Poziția de pornire este la coordonatele (iStart, jStart)
    int iStop = 5, jStop = 9; // Poziția finală la care trebuie să se ajungă este la coordonatele (iStop, jStop)

    // Apelăm funcția de găsire a drumului minim
    bfs(matrice, 6, 10, iStart, jStart, iStop, jStop);

    // Afișăm distanța de la poziția de pornire la poziția finală
    cout << matrice[iStop][jStop];

    return 0;
}