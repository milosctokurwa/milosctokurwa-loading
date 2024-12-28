local discord = {
    token = "?",
    serverID = "?",
}

function getDiscordData(src)
    local discordIdentifier = GetPlayerIdentifierByType(src, "discord")
    
    if discordIdentifier then
        discordIdentifier = string.gsub(discordIdentifier, "discord:", "")
        local name
        local image
        
        PerformHttpRequest("https://discord.com/api/v9/guilds/".. discord.serverID .."/members/"..discordIdentifier, function(err, text, headers)
            local DiscordData = json.decode(text)
            if DiscordData then
                if DiscordData.nick then
                    name = DiscordData.nick
                else
                    name = DiscordData.user.username
                end
                if DiscordData.user.avatar then
                    image = "https://cdn.discordapp.com/avatars/"..discordIdentifier.."/"..DiscordData.user.avatar..".webp?size=128"
                else
                    image = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg"
                end
            else
                name = GetPlayerName(src)
                image = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg"
            end
        end, 'GET', nil, {['Content-Type'] = 'application/json', ["Authorization"] = "Bot ".. discord.token})
        
        while not name or not image do
            Wait(100)
        end
        
        return {name = name, image = image}
    else
        return {
            name = GetPlayerName(src),
            image = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/925px-Unknown_person.jpg"
        }
    end
end

AddEventHandler('playerConnecting', function(_, _, deferrals)
    local source = source
    deferrals.handover({
        name = getDiscordData(source).name
    })
end)
