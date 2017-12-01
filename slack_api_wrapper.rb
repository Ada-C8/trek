require 'httparty'

class SlackApiWrapper
  BASE_URL = "https://slack.com/api/"
  TOKEN = ENV["SLACK_TOKEN"]

  def self.list_channels(token = nil)
    #look back at API documentation to see what goes in quotes
    #https://api.slack.com/methods/channels.list
    token ||= TOKEN
    url = BASE_URL + "channels.list?token=#{token}" + "&pretty=&exclude_archived=1"
    data = HTTParty.get(url)
    channel_list = []

    if data["channels"]
      data["channels"].each do |channel_data|
        channel_list << create_channel(channel_data)
      end
    end
    return channel_list
  end


  def self.send_msg(channel, msg, token = nil)
    token ||= TOKEN
    p "Sending #{msg} to channel: #{channel}"

    url = BASE_URL + "chat.postMessage?" + "token=#{TOKEN}"

    response = HTTParty.post(url,
      body: {
        "text" => "#{msg}",
        "channel" => "#{channel}",
        "username" => "cookie_monster",
        "icon_emoji" => ":cookie:",
        "as_user" => "false"
      },
      :headers => { 'Content-Type' => "application/x-www-form-urlencoded"}
    )
    return response
  end

  private

  def self.create_channel(api_params)
    return Channel.new(
      api_params["name"],
      api_params["id"],
      {
        purpose: api_params["purpose"],
        is_archived: api_params["is_archived"],
        members: api_params["members"]
      }
    )
  end
end
