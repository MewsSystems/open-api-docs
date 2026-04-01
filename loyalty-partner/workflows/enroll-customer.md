# Enroll customer

**Mews Operations** use the [Enroll a customer](/broken/spaces/NXX5WlJYsdpRtizxNDPz/pages/703d540b7d5b88a00678dd4148b956793bb5b43e#post-members) operation to enroll a Mews customer in the partner loyalty system by creating a new membership.

If the customer already exists in the partner system, return the same response as for a new enrollment: HTTP 200 with the existing membership details.

### Enroll customer

A Mews customer does not have a loyalty membership in the partner system. The Mews operator selects the appropriate loyalty program from a list of available options and sends an enrollment request to the partner system.

{% stepper %}
{% step %}
#### Add membership

<figure><img src="../.gitbook/assets/add-membership.png" alt="" width="563"><figcaption></figcaption></figure>
{% endstep %}

{% step %}
#### Select loyalty program

<figure><img src="../.gitbook/assets/select-loyalty-program.png" alt="" width="563"><figcaption></figcaption></figure>
{% endstep %}

{% step %}
#### Enrolled customer

<figure><img src="../.gitbook/assets/enrolled-customer.png" alt="" width="563"><figcaption></figcaption></figure>
{% endstep %}
{% endstepper %}
