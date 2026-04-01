# Search members

**Mews Operations** use the [Search members](/broken/pages/703d540b7d5b88a00678dd4148b956793bb5b43e#post-members-search) operation to find members in the partner loyalty system matching a specific Mews customer, based on personal information such as name, email, and address.

### New customer creation

A Mews operator is creating a new customer profile. The customer already exists in the partner loyalty system with a membership. During the creation process, Mews queries the partner system for potential matching members and returns a list of matches.

{% stepper %}
{% step %}
#### Create customer

<figure><img src="../.gitbook/assets/create-customer-screen.png" alt="" width="375"><figcaption></figcaption></figure>
{% endstep %}

{% step %}
#### Lookup results

<figure><img src="../.gitbook/assets/lookup-results.png" alt="" width="330"><figcaption></figcaption></figure>
{% endstep %}
{% endstepper %}

### Link membership to existing customer

A customer already exists in Mews without a linked loyalty membership. Mews queries the partner loyalty system to retrieve a list of possible matches.

{% stepper %}
{% step %}
#### Customer profile screen

<figure><img src="../.gitbook/assets/customer-profile-screen.png" alt="" width="563"><figcaption></figcaption></figure>
{% endstep %}

{% step %}
#### Customer lookup result

<figure><img src="../.gitbook/assets/customer-profile-lookup-result.png" alt="" width="563"><figcaption></figcaption></figure>
{% endstep %}
{% endstepper %}
