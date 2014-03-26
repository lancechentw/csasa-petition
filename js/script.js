var url = "data/mly-8.json";

function getEmblem(partyCode) {
    switch (partyCode) {
        case 'KMT':
            return 'img/kmt.svg';
            break;
        case 'DPP':
            return 'img/dpp.svg';
            break;
        case 'TSU':
            return 'img/tsu.png';
            break;
        case 'PFP':
            return 'img/pfp.svg';
            break;
        case 'NSU':
            return 'img/nsu.svg';
            break;
        default:
            return 'img/ic.svg';
            break;
    }
};

function getChoice(choiceCode) {
    switch (choiceCode) {
        case '0':
        case '1':
        case '2':
            return choiceCode;
            break;
        default:
            return '3';
            break;
    }
}

function getChoiceText(choiceCode) {
    switch (choiceCode) {
        case '0':
            return '不支持'
            break;
        case '1':
            return '支&nbsp;&nbsp;&nbsp;持'
            break;
        case '2':
            return '不表態'
            break;
        default:
            return '尚未表態';
            break;
    }
};

function createElement(data) {
    var div = document.createElement('div');
    div.addClassName('legislator-slot');

    var avatarDiv = document.createElement('div');
    avatarDiv.addClassName('avatar');
    var avatarImg = document.createElement('img');
    avatarImg.src = data.avatar + '?size=large';
    avatarImg.alt = data.name;
    avatarDiv.appendChild(avatarImg);

    var emblemDiv = document.createElement('div');
    emblemDiv.addClassName('emblem');
    var emblemImg = document.createElement('img');
    emblemImg.src = getEmblem(data.party);
    emblemImg.width = 32;
    emblemImg.height = 32;
    emblemDiv.appendChild(emblemImg);

    var nameDiv = document.createElement('div');
    nameDiv.addClassName('name');
    nameDiv.update(data.name.replace(/[a-zA-Z].*/, ''));

    var identityDiv = document.createElement('div');
    identityDiv.addClassName('identity row');

    var choiceDiv = document.createElement('div');
    choiceDiv.addClassName('choice');
    if (data.choice == '3') {
        choiceDiv.addClassName('choice-unknown');
    }
    choiceDiv.update(getChoiceText(data.choice));

    div.appendChild(avatarDiv);
    identityDiv.appendChild(emblemDiv);
    identityDiv.appendChild(nameDiv);
    div.appendChild(identityDiv);
    div.appendChild(choiceDiv);

    return div;
};

new Ajax.Request(url, {
    method: 'get',
    onSuccess: function(transport) {
        var data = transport.responseText.evalJSON();
        data.forEach(function(entry) {
            entry.choice = getChoice(entry.choice);
            var div = createElement(entry);
            $('legislator-list').insert(div);
        });
    },
});