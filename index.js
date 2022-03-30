const argv = require("yargs").argv;
const {
    listContacts,
    getContactById,
    removeContact,
    addContact,
} = require("./contacts");
require("colors");

const { Command } = require("commander");
const program = new Command();

program
    .option("-a, --action <type>", "choose action")
    .option("-i, --id <type>", "user id")
    .option("-n, --name <type>", "user name")
    .option("-e, --email <type>", "user email")
    .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const readline = require("readline");
const read = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function invokeAction({ action }) {
    switch (action) {
        case "list":
            listContacts();
            break;
        case "get":
            read.question(
                "Podaj id kontaktu, który chcesz wyświetlić: ".green,
                (id) => {
                    getContactById(id);
                    read.close();
                }
            );
            break;
        case "add":
            read.question("Podaj imię: ".green, (name) => {
                read.question("Podaj email: ".green, (email) => {
                    read.question("Podaj numer telefonu: ".green, (phone) => {
                        addContact(name, email, phone);
                        read.close();
                    });
                });
            });
            break;
        case "remove":
            read.question(
                "Podaj id kontaktu, który chcesz usunąć: ".green,
                (id) => {
                    removeContact(id);
                    read.close();
                }
            );
            break;
        default:
            console.warn("\x1B[31m Unknown action type!".red);
    }
}

invokeAction(argv);
