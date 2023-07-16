const { DateTime } = require("luxon");
const { query } = require("../services/load.database");

const identifyCheckController = async (req, res) => {
    res.status(200).send({
        status: 200,
        res: "The App is routing and the request is processed",
    });
};

const identifyController = async (req, res) => {
    const listSQL =
        "SELECT * FROM USERS_BITESPEED WHERE phoneNumber IN (SELECT phoneNumber FROM USERS_BITESPEED WHERE email = ? OR phoneNumber = ?) UNION SELECT * FROM USERS_BITESPEED WHERE email IN (SELECT email FROM USERS_BITESPEED WHERE email = ? OR phoneNumber = ?) UNION SELECT * FROM USERS_BITESPEED WHERE linkedId IN (SELECT id FROM USERS_BITESPEED WHERE email = ? OR phoneNumber = ?) UNION SELECT * FROM USERS_BITESPEED WHERE id IN (SELECT linkedId FROM USERS_BITESPEED WHERE email = ? OR phoneNumber = ?)";
    const listValues = [
        req.body.email,
        req.body.phoneNumber,
        req.body.email,
        req.body.phoneNumber,
        req.body.email,
        req.body.phoneNumber,
        req.body.email,
        req.body.phoneNumber,
    ];
    let primaryContatctId = null;
    let emails = [];
    let phoneNumbers = [];
    let secondaryContactIds = [];
    let createdTime = DateTime.now();
    console.log("created time", createdTime.toJSON());
    try {
        const rows = await query(listSQL, listValues);
        console.log(rows);
        await Promise.all(
            rows.map(async (row) => {
                console.log(row);
                if (row.linkPrecedence === "secondary") {
                    primaryContatctId = row.linkedId;
                    secondaryContactIds.push(row.id);
                }
                if (row.linkPrecedence === "primary") {
                    console.log("jvksn", createdTime.toJSON(), row.createdAt);
                    const createdAt = DateTime.fromJSDate(row.createdAt);
                    console.log(
                        createdAt.toJSON(),
                        createdTime.toJSON(),
                        createdAt < createdTime
                    );
                    if (createdAt < createdTime) {
                        createdTime = createdAt;
                        primaryContatctId = row.id;
                        console.log(primaryContatctId);
                    } else {
                        console.log("inside else");
                        secondaryContactIds.push(row.id);
                        const updateSQL =
                            'UPDATE USERS_BITESPEED SET linkedId = ?,linkPrecedence = "secondary" WHERE id = ?';
                        const updateValues = [primaryContatctId, row.id];
                        try {
                            const rows = await query(updateSQL, updateValues);
                            console.log(rows);
                        } catch (err) {
                            console.log("error in update query", err);
                        }
                    }
                }
                emails.push(row.email);
                phoneNumbers.push(row.phoneNumber);
            })
        );
    } catch (err) {
        console.log("error in list query", err);
    }

    res.status(201).send({
        contact: {
            primaryContatctId,
            emails: [...new Set(emails)],
            phoneNumbers: [...new Set(phoneNumbers)],
            secondaryContactIds,
        },
    });
};
exports.identifyCheckController = identifyCheckController;
exports.identifyController = identifyController;
