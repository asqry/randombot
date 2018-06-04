const botconfig = require('./botconfig.json');
const Discord = require('discord.js');
const fs = require('fs');
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

function loadCmds() {
    fs.readdir("./commands/", (err, files) => {

        if(err) console.log(err);

        let jsfile = files.filter(f => f.split(".").pop() === "js")
        if(jsfile.length <= 0){
            console.log("Couldn't find commands.");
            return;
        }

        jsfile.forEach((f, i) =>{
            delete require.cache[require.resolve(`./commands/${f}`)];
            let props = require(`./commands/${f}`);
            console.log(`${f} loaded!`);
            bot.commands.set(props.help.name, props);
        });

    });

}
function loadBot() {
    bot.on("ready", async () => {
        console.log(`${bot.user.username} is online!`);
        bot.user.setAvatar("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAR0AAACxCAMAAADOHZloAAACK1BMVEUEBAQEAAAAAAAAse3qE48AAwDI2isAAAP///8AAgACfKUDN0kDZIYBlshveRkAp9/Q4y14ghryFJQAuPaADE4EDBBZYRQDT2nM3iwChrReZhUwNQtGTRByfBk6Pw4PEAYVFwcAreyJlh4DXHtjbBYgIggEKzl6hRv5FJgULjoEntJ2C0gxNgxRWBNfCTo4BiMNIiq2xieksyT5AIRCSBAGQliLi4tqampVCDTfEoizD21UWxO/0ClpchjTEYFqCkEcBRLDEHdNTU1CByl6xZ93pm0EFh2gDmIZGweZmZmfriNZWVkoBhmODVd7e3sBj8DPz89xxZnp6eknKgovLy+HlB+u4Pg9udAuBh0bGxsCb5SxsbFjxvJ2dnYYAAAnhL4ATl9Mmt1bcwOYS0/8/fRNISuanYi6v5aCiFZMjYPWvkgntd5NvMaNeMjQ4FoxQgAAACJkKVcAJCaIkji8IYNtiABrgpM8PDy3qzvYj2KwAFtomOOUPoXmJpu+S6lkACyGWz1hwLZfmHmjYrg2GzMel7jZ5XsYEx/t88YAGgBsj0o9AABHM1aFw+DlQYPTqVPbfWoAHRrGyTbecXCaZLMTKADWmlpzhc7gY3X6kMbrZKqcQ3H6sNX4xN7/7/pmaVEqOzSbYH3FPnFKSFK2clYcepBHSTi2vYaNbHt7UWaJImiJsGfn8Zp9oLGuuGDQ07/X8PuNAEF/PHrp8LYyIBi1UK2X2PZnJ0l4aSxtGhY9AAAYp0lEQVR4nO2cjWMb5X3HdT/p0d3JL7rc2dbJlvz+cvNr5FdJlmQrKlbsWLZr4+LISVpYWUtSxlaypkADpXQtXVc6GJQyurJ2ZW3XroUy2v15+/2e5+4kWZIDRAlJuC8ktnR27vTR7/15Tj6fJ0+ePHny5MmTJ0+ePHny5MmTJ0+ePHny5MmTJ0+ePHny5MmTJ0+ePHny5MmTJ0+ePHnyVCuAT/sK7l0BdHt8mglgc2d508PTWIBk4OKmR6ehYBnsvzzVC8hswLOdxoLLKwA7Fzw6jQUry8senKbCqOzB8eTpsyqpge7e2e/x8CN118t31xDBZWX/4XsXj9RmhBupozx+NwCBoijH9zKdjkauJS2Vw+GRO4gHbO0ryj1cMROdhqFHksZ3/Ut3iA9iWTk+Pt68AReP7+VOndtOOXpCofY2zicc/Uh4ZLIC+ZSD7jHHZI4VZe/4eE9RLt/TUZnTCUdOaCQ06Q91I59o+CQexk7+E7Ici09MjJ5viAcPThzGp8UxgBvLpB1l74agtKzs3ft0GvhVd9lfxi/lE3gYO4lHRnHbkRvgsQ+KY3Buk0wFVpTjFcEEH+zt38N4HDob49Xq5oCiYfxa7qilkw/U0pEPzsRtzdS/TBgVh87EQIIdZCNJcENZgXPHNhOMy3v3Pp1QeLJK4XCUAs+I/6wk7Zar8LA5XV9jVbFCHox3upo5aT1yTBz4p4ce+seOjmu7HajdSz8aacPI4+JBWE0v71MG59IZqS2WR8IdaDgRP36PiNwfZ2ldzwNcqMIzUBE7+WLsg1LZuOavkmH4o5FNEP8sbO43ZQAXW/xyP6ZcOu01DoRQ2v1t3K+kSMW32LYeCOhX9isVHAbdM64mVk+8TugRRx/63OceGfL7awmVRbmJxnPxxK+pTnCDCycP3V01ocOP+LFcnozg4XHnGCsSnWI1ndWeKvUu1vqWvCie/s6LL3LjGeKIbE6Gn8pNtMP9nVoEjBXWmUqI0IfVO/KyP6Ka0/FJS2EqedCKovYxJiEc1Ks7DzsFrtxXremx2tcpH0zz59+9JuB84dKQf+jSe44ZGZMbElyEvapqGYmoUt7SA6l8utQ1O4eY2MdLas3qrk+iU+j4pBAafwfWy36HTpHT0bvgohNJIdtZrXis5pXAqHj2oc9/Hj1r6M+KcmnokqJ8oeJlSxJU0WGqbyqdC9jSUQHE9PbyaZ28XFOInlKWfgI1o0MxQfJhUI5guTwpXIsx+7JTy87FytC3SIq5OpDdghhlH3jika9x43lPUZCQUh1+RiTXs5iaTHMgJ2T95VjZbzaElmF4uKoWX0yYfa3DU0vHme6gR7UvIZ7dCBmOg46V9IAwnr9simgpL04Mbw3j/339jsZAPjPhqH9aPPnEI48I10I8CGeoBg8oN4CzKeQsPZ2qg4Pno99qnN1hLKNpbpkOo5ppDtwZOgDtBl4vGstS2DBCSGckyumMhIgOY6mAvkZ4MKkLZ4C4puH1mNrW4bCjGRDPmfild0I897vPfZ7nrCFDIeeqTV7/wzM6Y2lLL87lGsAJBG7irzU0HnkwYwYTzhGEEzS3WpjlqujA5s4I0jGiWJ7gFywC+UF0qwgPy6yLap0cx3NFLGNimzDQqQWDQbPfN2hrbAD6t/A5M7EIsnjqCkblaw6cejzfACozU1Z+G4r1fsX1lsLTvgwUZSovX4YMnuiQnqOOZVWbz2iLdybuwN7xCLedCP3N6YxPIp02KbIrURGCppNkU5xO0V7klWGmZxTpBLXRXlujfXihw2YwQ+3VqngKMzrZziVyq/fq8YxIbFbXpzA7pRvDCQR+RrEJVuPns3H50C0nIGFumVpfNjsWn+nP9muJCS3RygKp1rPepYuNikvmtjMpbIfoMHSqHFMHxdU6S+DQE89myHgSbvKKj2HTaZpxcDOak7MuUczB2PPnk5Vh5AUrMMeYlHZNJ53P2TnL1hxDPwZuO31OZIFhbdQ0E6PcduDAzBxoWvaO0Tl2U61RiTthEXdUhpe7hpfIjV+fsntR6sATponGM+EmKmzIYV7D5CUGP6jyEK8Dhy7xf/yE6dDprge2mbqm55yYrK/jb7HCbJdrTHnVB712azZqf+3UOudNc6IH+IUkgnglwVYm9BrPetgpRIzdyHh3N9KJjvCoXEY7QtsPpLAeYev8/czZdCCLtpPZIjxbnU6zvgiwpdEbDPZTTich/vk6OEOvD/0Q1JJVZK6ppKxUfgoL5inHenIqkw/sMVF2kA9E+rWtHgzD0yJBoB3FNXO4pZ1HNZ0dm44REYmdk0GvkqIRpJPXhcHgN/TmJu1OKHumMxOMI51gpsftt6aRDr0CsJ9q0GdVW87NhckoFK0pOHJYpEDdnsrrRSoibGsqwoDjNfIY2aWcyQC69FYnPQu9WnbMDGpjrTSdGjoXBB0jZBeGUjkkiZKnW2IFMh1OZ5bTSQs63LOCMG1S6Kn4lk1Htl2rbDRn4zeeXHiy3fiTNcvoJI4fUUuxng7kXWvSCz9w0hFMUEzb0qYPkccMDR7lA20LMqY539qmtZoO7As69sRCGkfTOevnvRY3nZIAwlIiMvBH0Em209k5zPE4vnVmwLUd/hCj8tea8hnSbxq77Y++j0BcFmnGpRZcNlN67g3bs7AIHZQx6Eycx8IhM8MzfSIDWS2onRwStI6OD678iF5C2IZzlpYkOjDyYLvF5vBdtccKwtptVvLMaE8m2DPak6DQc6Z31Na8sJ0Yf5B1evSGpvPSwnN+/4KxBKxSCubS6XxJYio4T+lHRevb/W5NvAp9mLvnzaA5QY6FQWd6gJy7xfOOmk4CeL0zyVsJKeJHnxrBlC4ZkkRTL9t0sKrl9i/8TD4/JieC8hj+TXgWz49xMduzxMPzdo/exHSuG+hc5Q5Ip51iUJ8CxtbyJbUSptcl/ZVBl04c09PYDJoOBhrMkDPaGYHqTtHhs0GbDq32dYTHJanNv4GHQhJPVD5noMx4WULpnWxnIo5RmUIxFYVBOy7HE7ZnudMv9Kya2axL58mFN/1+/b8HjKkUOJ6lzzJ8E9RS/opLR8VOY47OCNyTDrVOjDMiJssyNhM9hGqwpTG5is4krWN10OWGQ/i1g/LWkp8TQtMp6pg/6IL5UIoHT50ndbl/NZYJxlaf+urLv6f2YWtxhhSzPat/lR6tPvE17NFrFl2jhuNY1wNISI/C5EuFih/N8bUPlqxMM+ZYEjM+wjk+B9iKa/PY4yGPmVWZ4vMYbyla2WLV0BmnZaylEF1zeCnC1/qkMsHZ8LdJzIfNOZZrhWI+FchjxS+SeoFRcu07jznrnS//8Z3BYbrcwzEad43NazSGkvmDvgPuWdWLG9JIedJ2rIUPDePmS5NQ3gXmFoNra1N4Gmrt3ISOTTC9H/Awb6/Qo8hUM/1AvWcntS7YzdwpOkIVz6IFCSyUEQ7VOmg6aSjkdN1KTxX1vJp3k7q8OnEmE3z69384M0GxAN/AYRpdnEloh4gHesUk43eUszqkynYYn2s9b6JjDS08OgnP+2HdbRww7EhdaEAuHawG4Zc6ObcIwp19h3QyPKk8gHl8kVrhTOMFx9umYy9jnS1zOhttS+27xu449y2CwyiBF600lmd42Sxn27uOxi/3xfoTwT/+sT8W6wdKG2amfxG/n9diMdknTzvTr0fIs3xSewfXCHW4bTz2vL4wZLy5YIR/GDA25iqFMQX/rnXm9uxp7C1+ZYkSFFkkIM5738EDmfsVf18Oe+6I7Ux22BLW3tGxG1oKUZ/VzgfumML1dD4w14VWwy87kHeTurzYu5oJvky9+IwMMQo9GXywOq/19mIzGhN9+3dE3PFJ3HWpwyXrITrGhwG/8fp1Y/L9Z8NLs24xSFFHZV1uz653YXH+uMWLdfKrPqDmxZzPAobjM1TqIKqDzrvnWbTSR/WgT6TVPDaJAV4Bqmpqat1O6qo8Qz36r6kTz6InTfDInO3MJrR4Z1yGVbdH555l07GblTCNka7fNIznPzQ6nn1/MuK2DenkLGZEtuZWQHoh1fXG/1lUVMj9h9jxTnMePdieY76CIJ8SQKO16jtCB+1ml9pQ6j/R+fU89kB2xYPJg9n18iyjdfJE8JhWyunaqOrARAK8k5AHZCEoc5OsplOOnJVCUeqxiM7rxm7+hd12Z4CBJ2KFAv6Zc8P0dqr0xjTlTUrmGeDnCQYPAENQP1AICpp/gCrbaQ0oh057VRWCXykghylzYcGjpgI6WklOF/UfljtpNSnmy3kmx7K9meAHVBD3Eh2gC8WaOaFlR7NZiGWdWvmRGjp+w8BCvNtAOs8bxvXXjTKn46YspvqSjG0n3XKH5UpP/S+nM2Zqi9ieE4/DTvxmGAY4KVP5fq+DRIbBlqzcuPVOmcKyiMpnxzmZyCS3IECP0o/Ukt2iY9ixkqr9Oqwj4NXgB1Ty8ZL+8pd5w4WeRXWgs07Ke/QaOn6ic9awbeclI5J/oaPdLQaRTPIIbWe2ksRSpcc4HSxztmzT0foWqQPm2Txofk+BMXssBufntZZE6KpOglaHHc9aIjK0Dir523Jk6RhoUipfl2RdKcBIJFyrCNyz9vbELhQAZZmKNPNwSxuoWrjhPXpjOs/fxMj8ofFq8f3JL1XKndm1JMWdpJvEIND1RgHjDubv4KhtOokZDMe9MCZM59cXICaaeIiZmb6WBOiaPsuh4xNk2igeRZ7jo4uiYzo+NVdSp3RddM86zFCPnv39B3G0HejeR0w8m1ApUllg55PTxnQ+1DFn3QxD17PhNrcwBl4pS1NTlSRmJXtnMWdhQMvCwZZpOxZNTYYFnRsgn+d0oFdLyK3JXs3ocDK71Lhf1/Uuqngc0zmy1rEazIFotrqe4j36V1/+4OnR5T3aySVT/4NXmx2tqD7uOHSwzXrUeG6hDNsB4/vu7IvOxFjJnX3pxaQOj5WsAvabyINHYezpMCT3gSzgfE85B3KMQl8Wf6RFyasJHR+RoeEOYE+lU83qTneKeXWbgBXspC73aeY0wDvHe3vYAlHsmeZB4bzP3bki1eWsCp3nFp7EWnkN4FvhH7qWQrZTwGKwksSKOfhBXgcsdbJOoNmSpzEkQ1zQeVnZx++Bhs0tg9OcDo29sD2HvI52omK8lDgdVQ1MYYTGR6IWsb4dz5hmopP6cmexmxdnZtXOlVOisn9Ix6T1fJpB+YsvuHTWsM/CyMynYbQwoa+lSvAYUpvQhrOivMFiB+aDFPXsjKWg8RzILYXTlI7YYiD5v4uX9tKrgE2V2CrCZnWmpugRX9nS9TwPM4czqz09ldVsfM50F7ic9azGdIznF/zGnywGkx+6Cb2oAtAsALCWeOWZnzzzil6y1tm3rdIbZhAGRWUcDKKXdYLMy0JyLEXZgdHWwmlAx7DpwBDtGnwJ6bwevaKLaQ7aTp6KHTF/wdfx09fEqrCpZeYrwxV6Q7X+vmmug4ODsXf915p5FrWhUQgUv24kLbe6EftTkpgKntFIrwTS5FjyPLbhWZHOzWGalsowIUznA4V292azWqaVBXMtnaVoKBQS+wThwo9CEnXNevFZ/z/rtmNhsbOmpqk4ZDyP/etrr72WsFU1P5APEpmq/YTx+pwV9otqEBW4+SpMWV+MgttICAsi/YuwjB9b2/C4lX5MmwcYZfw5LdaL2dxnF83mlxVaSx7VMi0dgDXeg8H3qynGONDoYjb3pUcXctyxVEhb2yoftsyl2ZHOg8JTMbFJpb/qumT4u7/5yldjM7aeqO1CheVIojI3nqREnTfaQK1bRU8JHzKvFpmath43tQNsT7IiY0GGfEjEoODf8vstejTqLeC0veW3Q8cVHJ/bV76wK2HYLTDryhctvkDDoGjpCEUvsG1aNhBjnr+eEWOKajrQvTk2E/uKs6nnJJ3JaBs+sOmEsE+A0HPPAjuJB/1K0PkmYHOXxs4WjSUrMtZwlhYgZFlz6OzBqoY9xsQ812BLHKwZHUw/KxD+FiYs9KDc129SklWPcoGCNYv5nCV1GjKsiaT+D2KJr3o/LixfhNjE009XcpZDh6sywfAbUXSr9NeNv7dKiGe21rmuchBasA9YSp9Av5JltsiTlNkTJNORD+ygvL8MMYQzhtUiD4PnIdYC+2lMBy5sLu8sL3/jJi2Y07jruj4rzabRgiAfoGGvlecDGNFOJMU6xEANHSoL/+vyID8y+O61a0OcTpu404Aspz3E4exKEuQXwiFYs2i0NlWNR38N44t29ZkjQI/+lRbEM8hjAyKFH/K1K3lM0MF3E+HEsODhZTRWWzP9LZijcjr+E3Rgme/Yp706ekmlxYGUblmB9Bx+L+UsXU/R0Ndd2frlYzxvV+9Ig3M7+Pu/7umxp18vvsjp1E1OjRB+z6Q3h14ANmvlJQovla0X+mum9hM9cIQRyfolvXgsb2b6eBzO8HEOxmgOI9Mjr2pm7CAWc+hk+6C/bnP5J6OzVEsHLl8AH1vvCojpMZVl0B6lCoSIqNvJddWum8UeVH0U81O8dhkSLm/ubP5n79NOzqJaGarWJEJiWhLhuWDEuElt+VEKC3KQkmulYjqXIkg/1q6iveK7Y72CL3igc2axc1UWfZXWg4/i09zPzPnpYS0YH+gZA4fOAPS3oEsX92f5aulsIpyiZekiq1pWikngr2xartxHYq9sFYF2ZdX+wxi46B4aYBgepfIQn4z8lauzu1RZ7W5wOBGjrYDlsMqoCC+ipajccqVC8afa1Vkge0I4cbHBS4xnsY/YEY96+bx9S8sciCmBTWcQRluwf5DT8dXQgQtkOkfJQjFQevw3hVKhUGA+Pu2pE7NHDMPx/vots3xrxGLn4WHnYlmMk6tEVeeS2MA5gukd7cYq0hpWKWWl0qXf/vYvvynmA1ZuS9uCoxzVhJUoQr0D1sw74n5SCsMYuLfsd0dE5aDWL8PoQUs86yQdvt+WrjQwhd93CVuhmUb9r6u82dKnAC43vvlVtuc7/hrRjRJtkqiwQnzPB5YHVmqWYlyhlE+9pfz833Pprm0ajGpXr5paYrqq1Dyf0DL9cOGc2LoIE5ng/IxjuvRF7h2cXu2FmhKjhXTE5ld2tCbo2D/ob3Cfn1hwwj51+cYpt3dKtXTCu+UlyWYzHg53j/A9m2oXZsJZvvUCXlWUG/AfAA/7ul555pvzwzM1fgsr7yBxe1Owzd89yOfYvTFg2ek741nn7I3sjHXhtzYdMYGvukQQFibicmFn5bj5dnSpe8NnbNiS3IJckjaiVPrYp2ZSUbdSxSRW5MfHy3sDys6s8pYVKNVvdIfNy+c2V065QYAqoVaUyw3oVD4Xh01tQoXOht9X9TPL+3u0CduOy+k9RdlvfjeV2MghVcDw1N4WNXbPSi4dRH0Fw46lYwtaLKbz/6YoP8tP1d1LyM9+48JFuHjn779pSOec2OkP8PYKMIcO+ke0yvto43E3Ru853lnrP1dOvXW6hg7pbCQUNq6N87hcOTWimOtK892mgVROUX4Djdj4hOUu79x5OkvhOjpUKl/k538bX36FjlTJ6rCn8IEKviC+vTvws1vS6ahoMmwY4Y73FIW/CVJNmU47vpjqkzD2HF9QTgNwF+4nxZKVXvLJTqKb3/v7aherouOz97zzH+B0aHO+U/srSt1NaDXnGUFF8U+Ivlkapx2uDemQ+OQLsNpeOffp3ry2ZIgpe30XSqql46skLf7a+O2usCKK/l8snx4G+FKr/YcHHzRQUQRIZ+tzoU+Yxqd8u7EUFbsoG96fxclU06kSf1+BjzqK9o0lt3wlZCTSSIWw8xt38SNbPp6wUDWojvnYdOzXBvj+b9tJnd3qrT5B5z6QtNS+0cCzhE6jI0QfGcicvU5wfPl057rv6PjswuyT0YFz1JKJkZUu3eojLe5DOkK3Q8cZgpXqbkc/eZLPGB3xYZz2gi7dY3L6ST5zdKgXZHZcXjvtJ32fQTp8+zBAvrKB+bSTPHB02K3owGUsqn/hJvVTT/KA0Zkr4X+3sAheVIu4nD898nA6jWZo97L4DLchHR9bn12/BRwfbxzd7QFNemou3lDdb3B2aOrZmI6v4XSl7mcKOWeJJV045Rfq2817XgD7+8pKMzofQYzWunRHlnPTXwPdh3T4x0XC7dBJokrJtS780mUVks1D831Ihz5Zav/ybdDhH5Q2xY5oYJ60mg3zSPchHZFzmkTljyqkM0cbnpDOKT91P9LxAf4n7YY8Ok0l+TtaQaeQOq3gkcbvTzpSxDBu59JtOr5b9KH3KZwNWqG8jU98deg8kJImxT6jT/wPPMh0pDaxRaLx2sBH0QNNJyLotHl0GkjsqvY32mPxEYXNfOnKA0rH3gp6O9VI/QcLP0CSItHQ0v2Zb++GnI0jnjx58uTJkydPnjx58uTJkydPnjx58uTJkydPnjx58uTJkydPnjx58uTJk6f7VP8P9oK1Es0Rz/AAAAAASUVORK5CYII=");
        console.log("Avatar Set!");
    });
}

loadBot();

loadCmds();

bot.on("message", async message => {
    if(message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandFile = bot.commands.get(cmd.slice(prefix.length));
    if(commandFile) commandFile.run(bot, message, args);

    if(cmd === `${prefix}reload`){
        message.delete().catch();
        let embed = new Discord.RichEmbed()
        .setDescription("All Commands Have Successfully Reloaded");
        message.channel.send(embed).then(msg => {msg.delete(5000)});
        loadCmds()
    }

    if(cmd === `${prefix}rlbot`){
        message.delete().catch();
        let rembed = new Discord.RichEmbed()
        .setDescription("Bot Has Successfully Reloaded");

        message.channel.send(rembed).then(msg => {msg.delete(5000)});

        loadBot()
    }
    
    if(cmd === `${prefix}setgame`){
           message.delete().catch();
           let game = args.join(" ");
        
           bot.user.setActivity(`${game}`, {type:"Playing"});
                                            
           let setgameembed = new Discord.RichEmbed()
           .setTitle(`Successfully set the game to "${game}"`)
                                
           message.channel.send(setgameembed).then(msg => {msg.delete(5000)});
    }

});

bot.login(process.env.TOKEN);
