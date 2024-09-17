const { MarkovMachine } = require('./markov');

describe('MarkovMachine', () => {

    test('constructor should build words and chains correctly', () => {
        const mm = new MarkovMachine("the cat in the hat");
        expect(mm.words).toEqual(['the', 'cat', 'in', 'the', 'hat']);

        const expectedChains = new Map([
            ["the", ["cat", "hat"]],
            ["cat", ["in"]],
            ["in", ["the"]],
            ["hat", [null]]
        ]);
        expect(mm.chains).toEqual(expectedChains);
    });

    test('choice should return a random word from the array', () => {
        const arr = [1, 2, 3];
        const choice = MarkovMachine.choice(arr);
        expect(arr).toContain(choice);
    });

    test('makeText should generate random text', () => {
        const mm = new MarkovMachine("the cat in the hat");

        const text = mm.makeText(5);
        const words = text.split(" ");

        expect(words.length).toBeLessThanOrEqual(5);
    });

    test('make text should stop at null', () => {
        const mm = new MarkovMachine("the cat in the hat");
        const text = mm.makeText();

        expect(text.includes('hat')).toBe(true);
    });
});

