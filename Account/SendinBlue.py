# from __future__ import print_function
# import time
# import sib_api_v3_sdk
# from sib_api_v3_sdk.rest import ApiException
# from pprint import pprint

# # Configure API key authorization: api-key

# def run():
#     configuration = sib_api_v3_sdk.Configuration()
#     configuration.api_key['api-key'] = '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'

# # create an instance of the API class
#     api_instance = sib_api_v3_sdk.ContactsApi(sib_api_v3_sdk.ApiClient(configuration))
#     create_contact = sib_api_v3_sdk.CreateContact(
#     email= "olabodeezekiel@yahoo.com", 
#     ) # CreateContact | Values to create a contact

#     try:
#         # Create a contact
#         api_response = api_instance.create_contact(create_contact)
#         print(api_response)
#     except ApiException as e:
#         print("Exception when calling ContactsApi->create_contact: %s\n" % e)