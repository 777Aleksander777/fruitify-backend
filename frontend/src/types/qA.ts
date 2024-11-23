export interface QAProps {
    nazwa: string,
    pytaniaIOdpowiedzi: [
        {
            id: number,
            pytanie: string,
            odpowiedz: string,
        }

    ],
}